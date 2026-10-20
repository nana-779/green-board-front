// api 관련 요청 모음
// Spring board API 응답 규칙
// { success, message, data }

const API_SERVER = "http://127.0.0.1:8080/api";

async function apiRequest(path, method = "GET", body = null) {
  // 로그인 외의 모든 요청은 헤더에 authorization: {token} 설정
  const headers = {};
  if (path !== "/user/login") {
    Object.assign(headers, getAuthHeader());
  }
  // 요청에 body 내용이 있는 경우 content-type 헤더 설정
  if (body != null) {
    headers["Content-Type"] = "application/json";
  }

  // 삼항연산자
  // 조건식 ? 값1 : 값2
  // 만약 조건식이 참이면 값1, 거짓이면 값2를 반환
  let response;
  try {
    response = await fetch(`${API_SERVER}${path}`, {
      method,
      headers,
      body: body === null ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("서버에 연결할 수 없습니다");
  }

  const result = await response.json().catch((err) => {
    console.error(err);
    return null;
  });

  // result? < 해당 변수가 비어있지 않은지 먼저 체크 후 나머지코드 실행
  if (!response.ok || !result?.success) {
    // 액세스 토큰 만료 등으로 401코드가 반환될 시 재로그인 유도
    // - 이미 로그인 화면에서 로그인 요청을 시도중이기 때문에
    // - 다시 로그인 화면으로 보낼 필요 X
    if (response.status === 401 && path !== "/user/login") {
      localStorage.removeItem("accessToken");
      requireLogin();
    }
    throw new Error(result?.message || `요청 실패 (${response.status})`);
  }

  return result.data;
}
