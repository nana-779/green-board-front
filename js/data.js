const samplePost = {
  id: 1,
  title: "첫번째 게시글",
  content: "게시판 실습중",
  author: "학생",
  createdDatetime: "2026-10-16",
};

let posts = [
  samplePost,
  { ...samplePost, id: 2, title: "문서구조" },
  { ...samplePost, id: 3, title: "학습내용 정리" },
];

let comments = [{ id: 1, boardId: 1, content: "첫댓", author: "학생" }];
