// 현재 로그인 여부 조회
function isLoggedIn() {
  // 로컬스토리지에 액세스토큰이 존재하는 경우 true 반환
  // 그렇지 않은 경우 false 반환
  return Boolean(localStorage.getItem("accessToken"));
}

// 로그인이 안되어있으면 로그인 페이지로 리다이렉트 기능
function requireLogin() {
  if (isLoggedIn()) {
    return true;
  }
  location.replace("login.html");
  return false;
}

document.querySelector(".logout-button").addEventListener("click", logout);

async function logout() {
  // 서버에 토큰 무효화 알리기
  try {
    const accessToken = localStorage.getItem("accessToken");
    await apiRequest("/user/logout", "POST", { accessToken });

    // 로컬스토리지 내 토큰 제거
    localStorage.removeItem("accessToken");

    // 로그인 페이지로 이동
    location.replace("login.html");
  } catch (error) {
    // #nav-message.textContent -> alert로 대체
    alert(error.message);
  }
}

// Authorization header 생성
function getAuthHeader() {
  const accessToken = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

// 로그인 여부에 따른 로그인, 로그아웃 버튼 nav UI 설정
function setupNavigation() {
  // 로그인 상태 -> 로그아웃 버튼 숨김
  document.querySelector(".login-link").hidden = isLoggedIn();
  // 로그아웃 상태 -> 로그인 버튼 숨김
  document.querySelector(".logout-button").hidden = !isLoggedIn();

  // 로그아웃 상태 -> 글쓰기 버튼 숨김
  document.querySelector(".write-link").hidden = !isLoggedIn();
  // 로그아웃 상태 -> 게시판 버튼 숨김
  document.querySelector('nav > a[href="index.html"]').hidden = !isLoggedIn();

  // 게시판/ 글쓰기 등 모든 화면도 로그인되어야 노출되어야함
}

setupNavigation();
