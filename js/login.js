async function login(event) {
  event.preventDefault();

  const form = event.currentTarget;
  // 로긘 과정에서 문제 발생 시 안내문구 출력
  const message = document.querySelector("#login-message");

  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;

  try {
    // 웹에서 다른 api를 쓸때 여러가지 라이브러리가 있음 fetch, ?? 등
    const response = await fetch("http://127.0.0.1:8080/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    // http 상태코드가 200이 아니거나
    // api 응답의 성공 여부가 성공이 아닌 경우
    if (!response.ok || !result.success) {
      throw new Error(result.message || "로그인에 실패했습니다");
    }

    // 로그인은 성공했지만 응답에 토큰이 없는 경우
    if (!result.data.accessToken) {
      throw new Error("액세스 토근이 없습니다");
    }

    // 로컬 스토리지에 액세스 토큰 저장
    localStorage.setItem("accessToken", result.data.accessToken);
  } catch (error) {
    message.textContent = error.message;
  }
}

document.querySelector("#login-form").addEventListener("submit", login);
