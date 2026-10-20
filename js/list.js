let currentPage = 0;
let totalPages = 0;

const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");

// 로그인 안됐을때 로그인 페이지로 리다이렉트
if (requireLogin()) {
  // 게시글 리스트 조회 및 렌더링
  loadPosts();
}

async function loadPosts(page = currentPage) {
  try {
    const data = await apiRequest(`/board?page=${page}&size=10`);

    renderPosts(data.content);

    currentPage = data.number;
    totalPages = data.totalPages;

    document.querySelector("#list-message").textContent =
      `전체 ${data.totalElements} 개`;

    let pageNumber = "";
    if (totalPages === 0) {
      pageNumber = "0 페이지";
    } else {
      pageNumber = `${currentPage + 1} / ${totalPages} 페이지`;
    }
    document.querySelector("#page-number").textContent = pageNumber;
    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage + 1 >= totalPages;
  } catch (error) {
    document.querySelector("#list-message").textContent = error.message;
  }
}

previousButton.addEventListener("click", function () {
  if (currentPage > 0) {
    loadPosts(currentPage - 1);
  }
});

nextButton.addEventListener("click", function () {
  if (currentPage + 1 < totalPages) {
    loadPosts(currentPage + 1);
  }
});
