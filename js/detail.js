const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

// posts 배열에서 사용자가 누른 게시글 찾기
// let post = posts.find((item) => item.id === postId);
async function loadPost() {
  try {
    const post = await apiRequest(`/board/${postId}`);
    renderPost(post);
    document.querySelector("#post-message").textContent = "";
    return true;
  } catch (error) {
    document.querySelector("#post-title").textContent = "게시글 조회 실패";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#post-message").textContent = error.message;
    return false;
  }
}

async function loadComments() {
  try {
    const comments = await apiRequest(`/comments/${postId}`);
    renderComments(comments);
  } catch (error) {
    document.querySelector("#comment-message").textContent = error.message;
  }
}

if (requireLogin()) {
  if (Number.isSafeInteger(postId) && postId > 0) {
    // 게시글 상세 조회
    loadPost().then(function (success) {
      if (success) {
        // API 조회
        loadComments();
      }
    });

    // 해당 postId에 해당하는 댓글말 출력하도록 필터링
    // let filteredComments = comments.filter(
    //   (comment) => comment.boardId === postId,
    // );
    // renderComments(filteredComments);
  } else {
    document.querySelector("#post-title").textContent =
      "잘못된 게시글 번호입니다";
    document.querySelector("#post-content").textContent = "";
  }
}

// 댓글 작성 폼 submit 시 댓글 추가
document
  .querySelector("#comment-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const input = document.querySelector("#comment-content");
    const content = input.value.trim();
    const message = document.querySelector("#comment-message");

    if (!content || content.length > 255) {
      message.textContent = "댓글은 1-255자 이내로 입력하세요";
      return;
    }

    try {
      // 댓글 생성(저장) API 호출
      await apiRequest(`/comments/${postId}`, "POST", { content });
      input.value = "";
      await loadComments();
    } catch (error) {
      message.textContent = error.message;
    }
  });
