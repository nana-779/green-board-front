//localStorage의 데이터를 읽어서 배열 형태로 만들기
function readLocal(key) {
  const stored = localStorage.getItem(key);

  if (stored === null) {
    return [];
  }

  try {
    const value = JSON.parse(stored);
    if (Array.isArray(value)) {
      return value;
    } else {
      return [];
    }
  } catch {
    return [];
  }
}

let posts = readLocal("posts");
let comments = readLocal("comments");

// 로컬 스토리지에 게시글 / 댓글 관련 데이터 저장
function saveLocal() {
  localStorage.setItem("posts", JSON.stringify(posts)); // 게시글 데이터를 저장
  localStorage.setItem("comments", JSON.stringify(comments)); // 댓글 데이터를 저장
}

function getPostNextId() {
  let maxId = 0;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id > maxId) {
      maxId = posts[i].id;
    }
  }
  return maxId + 1;
}

function getCommentNextId() {
  let maxId = 0;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id > maxId) {
      maxId = comments[i].id;
    }
  }
  return maxId + 1;
}
