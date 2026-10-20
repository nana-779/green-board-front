async function login(event) {
  event.preventDefault();

  const form = event.currentTarget;
  // 로긘 과정에서 문제 발생 시 안내문구 출력
  const message = document.querySelector("#login-message");

  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;

  try {
    const tokens = await apiRequest("/user/login", "POST", {
      username,
      password,
    });

    // 로그인은 성공했지만 응답에 토큰이 없는 경우
    if (!tokens.accessToken) {
      throw new Error("액세스 토근이 없습니다");
    }

    // 로컬 스토리지에 액세스 토큰 저장하고 홈으로
    localStorage.setItem("accessToken", tokens.accessToken);
    location.href = "index.html";
  } catch (error) {
    message.textContent = error.message;
  }
}

document.querySelector("#login-form").addEventListener("submit", login);
