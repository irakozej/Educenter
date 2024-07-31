document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  const footer = document.querySelector("footer");

  // Toggle navbar and footer visibility on scroll
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      navbar.style.transform = "translateY(-100%)"; // Hide navbar on scroll down
      footer.style.transform = "translateY(100%)"; // Hide footer on scroll down
    } else {
      navbar.style.transform = "translateY(0)"; // Show navbar on scroll up
      footer.style.transform = "translateY(0)"; // Show footer on scroll up
    }

    lastScrollTop = scrollTop;
  });

  const newPostForm = document.getElementById("newPostForm");
  const postsSection = document.getElementById("postsSection");

  newPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const postContent = document.getElementById("postContent").value;
    const postImage = document.getElementById("postImage").files[0];

    // Create post object
    const post = {
      id: Date.now(),
      content: postContent,
      image: postImage ? URL.createObjectURL(postImage) : null,
      likes: 0,
      likedBy: [],
      comments: [],
    };

    // Save post to localStorage
    savePost(post);

    // Create and display the post
    createPostElement(post);

    // Reset form
    newPostForm.reset();
  });

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.setAttribute("data-id", post.id);

    let postContentHtml = `<h3>Jean Paul IRAKOZE</h3><p>${post.content}</p>`;
    if (post.image) {
      postContentHtml += `<img src="${post.image}" alt="Post Image">`;
    }

    postContentHtml += `
      <div class="actions">
        <button onclick="likePost(${post.id})">Like <span class="like-count">${post.likes}</span></button>
        <button onclick="toggleComments(${post.id})">Comments</button>
        <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>
      </div>
      <div class="comment-section" id="comments-${post.id}" style="display:none;">
        <h4>Comments</h4>
        <ul class="comment-list"></ul>
        <textarea placeholder="Add a comment..."></textarea>
        <button onclick="addComment(${post.id})">Post</button>
      </div>
    `;

    postDiv.innerHTML = postContentHtml;
    postsSection.appendChild(postDiv);
  }

  function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    posts.push(post);
    localStorage.setItem("communityPosts", JSON.stringify(posts));
  }

  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    posts.forEach((post) => createPostElement(post));
  }

  loadPosts();
});

function likePost(postId) {
  const posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
  const post = posts.find((post) => post.id === postId);
  const userId = "user123"; // Example user ID

  if (!post.likedBy.includes(userId)) {
    post.likes += 1;
    post.likedBy.push(userId);
  } else {
    post.likes -= 1;
    post.likedBy = post.likedBy.filter((user) => user !== userId);
  }

  localStorage.setItem("communityPosts", JSON.stringify(posts));
  document.querySelector(`.post[data-id="${postId}"] .like-count`).textContent =
    post.likes;
}

function addComment(postId) {
  const commentText = document.querySelector(
    `#comments-${postId} textarea`
  ).value;
  if (commentText.trim() === "") return;

  const posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
  const post = posts.find((post) => post.id === postId);

  const comment = {
    id: Date.now(),
    text: commentText,
  };

  post.comments.push(comment);
  localStorage.setItem("communityPosts", JSON.stringify(posts));

  const commentList = document.querySelector(
    `#comments-${postId} .comment-list`
  );
  const commentLi = document.createElement("li");
  commentLi.textContent = comment.text;
  commentList.appendChild(commentLi);

  document.querySelector(`#comments-${postId} textarea`).value = "";
}

function deletePost(postId) {
  let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
  posts = posts.filter((post) => post.id !== postId);
  localStorage.setItem("communityPosts", JSON.stringify(posts));
  document.querySelector(`.post[data-id="${postId}"]`).remove();
}

function toggleComments(postId) {
  const commentSection = document.getElementById(`comments-${postId}`);
  if (commentSection.style.display === "none") {
    commentSection.style.display = "block";
  } else {
    commentSection.style.display = "none";
  }
}
