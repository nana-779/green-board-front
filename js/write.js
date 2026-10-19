// 게시글 작성 화면 JS
// 게시글 제목, 내용 입력하고 버튼 눌러서 등록

const form = document.querySelector("#post-form");

form.addEventListener("submit", function (event) {
  // 폼 요청의 어쩌구 뭘 비활성화?
  event.preventDefault();

  // 내용이 적절한지 검사하고 새로운 게시글로 등록
  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();

  if (title.length < 10 || title.length > 50 || content.length < 10) {
    document.querySelector("#form-message").textContent =
      "제목은 10-50자 이내, 본문은 10자 이상 입력하세요";
    return;
  }

  posts.push({
    id: getPostNextId(),
    title: title,
    content: content,
    author: "실습자",
    createdDatetime: new Date().toString().slice(0, 10),
  });
  saveLocal();
  // 글을 저장하고나면 목록 화면으로 이동
  location.href = "index.html";
});
