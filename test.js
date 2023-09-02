const fetch = require("node-fetch");
const { CookieJar } = require('tough-cookie');

const cookieJar = new CookieJar();
const BASE_URL = "http://localhost:4000/api";

const USER_MOCK = {
    email: 'testuser1@example.com',
    password: 'testPassword1',
    userInfo: {
        firstName: 'Test',
        lastName: 'User1',
        image: 'image1.jpg',
        location: 'Location1',
        occupation: 'Occupation1',
        following: [],
        followers: [],
        posts: [],
        activity: []
    }
}

const checkStatus = (response, expectedStatus) => response.status === expectedStatus;
const checkResponseBody = async (response, expectedResponse) => {
    const body = await response.json();
    return JSON.stringify(body.data) === JSON.stringify(expectedResponse);
};

const runTest = async (description, route, method, body, expectedStatus, expectedResponse = null, headers = {}) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json', ...headers
        },
        body: body ? JSON.stringify(body) : null,
        cookieJar: cookieJar
    };

    try {
        const response = await fetch(`${BASE_URL}${route}`, options);
        if (!checkStatus(response, expectedStatus)) throw new Error(`Expected status ${expectedStatus}, but got ${response.status}`);
        if (expectedResponse && !await checkResponseBody(response, expectedResponse)) throw new Error(`Expected body ${expectedResponse}, but got ${response.data}`);
        console.log(`✅ ${description}`);
        return response;
    } catch (error) {
        console.error(`❌ ${description}`, error);
    }
};

(async () => {
    const res = await runTest("Register", "/users/register", "POST", USER_MOCK, 200);
    const user = await res.json();
    await new Promise(resolve => setTimeout(resolve, 1500));

    await runTest("Email Exist Register", "/users/register", "POST", USER_MOCK, 409);
    await new Promise(resolve => setTimeout(resolve, 1500));

    await runTest("Login Bad Email", "/users/login", "POST", { email: "not exist", userPassword: USER_MOCK.password, rememberMe: false }, 401);

    const loginResponse = await runTest("Login", "/users/login", "POST", { email: USER_MOCK.email, userPassword: USER_MOCK.password, rememberMe: false }, 200);
    const loginCookies = loginResponse && loginResponse.headers.raw()['set-cookie'];

    await runTest("Get Active User", "/users/user", "GET", null, 200, null, { Cookie: loginCookies });

    await runTest("Get User By Id", `/users/${user.id}`, "GET", null, 200);

    await runTest("Get all users", "/users", "GET", null, 200);

    await runTest("Get friend suggestions", `/users/suggest/${user.id}`, "GET", null, 200);

    await runTest("Update User Activity", `/users/activity/${user.id}`, "PUT", { activity: "REGISTER" }, 200);

    await runTest("Follow User", "/users/follow", "POST", { userId: user.id, followUserId: "dd8559c4-0ea5-4e93-8924-3b71b3fe1983", isSuggestion: false }, 200);

    await runTest("Unfollow User", "/users/unfollow", "POST", { userId: user.id, unfollowUserId: "dd8559c4-0ea5-4e93-8924-3b71b3fe1983" }, 200);

    const postRes = await runTest("Add Post", `/posts/${user.id}`, "POST", { content: "Test Add Post" }, 200);
    const post = await postRes.json();

    await runTest("Get User Home Posts", `/posts/getUserHomePosts/${user.id}`, "GET", null, 200);

    await runTest("Get User Posts", `/posts/${user.id}`, "GET", null, 200);

    await runTest("Add Post Like", `/posts/like/${post.data.id}/${user.id}`, "PUT", { newPostContent: "Test Edit Post" }, 200);

    await runTest("Edit Post", `/posts/edit/${post.data.id}`, "PUT", { content: "Test Add Post" }, 200);

    await runTest("Delete Post", `/posts/${post.data.id}`, "DELETE", null, 200);

    await runTest("Logout", "/users/logout", "POST", null, 200);

    await runTest("Delete User", `/users/${user.id}`, "DELETE", null, 200);

    console.log("All tests finished!");
})();
