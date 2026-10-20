// 게시글 작성 화면 JS
// 게시글 제목, 내용 입력하고 버튼 눌러서 등록

// 로그인 안됐을때 로그인 페이지로 리다이렉트
requireLogin();

const form = document.querySelector("#post-form");

form.addEventListener("submit", savePost); // 괄호붙여서 실행하는게 아니라 그냥 넘겨주기

async function savePost(event) {
  // 폼 요청의 어쩌구 뭘 비활성화?
  event.preventDefault();

  // 내용이 적절한지 검사하고 새로운 게시글로 등록
  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();

  // form message 요소를 필요할때마다 생성해서 사용하지 않고
  // 미리 변수에 저장해 재사용하는 방식으로 구현
  const formMessage = document.querySelector("#form-message");

  if (title.length < 10 || title.length > 50 || content.length < 10) {
    formMessage.textContent =
      "제목은 10-50자 이내, 본문은 10자 이상 입력하세요";
    return;
  }

  try {
    await apiRequest(`/board`, "POST", { title, content });
    // 글을 저장하고나면 목록 화면으로 이동
    location.href = "index.html";
  } catch (error) {
    formMessage.textContent = error.message;
  }
}
