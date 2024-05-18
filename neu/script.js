document.addEventListener("DOMContentLoaded", () => {
  const initialData = { post1: { likes: 15, comments: ["Toller Beitrag!", "Das sieht super aus!"] }, post2: { likes: 8, comments: ["Wow, großartig!", "Ich liebe das."] }, post3: { likes: 22, comments: ["Fantastisch!", "Sehr schön gemacht."] } };
  Object.keys(initialData).forEach(id => {
    localStorage.setItem(`likes-${id}`, localStorage.getItem(`likes-${id}`) || initialData[id].likes);
    localStorage.setItem(`comments-${id}`, localStorage.getItem(`comments-${id}`) || JSON.stringify(initialData[id].comments));
  });
  document.querySelectorAll(".post").forEach(post => {
    const id = post.dataset.id, likesEl = post.querySelector(".likes-count"), commentsEl = post.querySelector(".comments-list");
    likesEl.textContent = `${localStorage.getItem(`likes-${id}`)} Likes`;
    JSON.parse(localStorage.getItem(`comments-${id}`)).forEach(comment => commentsEl.innerHTML += `<li>${comment}</li>`);
    const updateLikes = () => {
      let likes = parseInt(likesEl.textContent) + 1;
      likesEl.textContent = `${likes} Likes`;
      localStorage.setItem(`likes-${id}`, likes);
    };
    post.querySelector(".like-btn").onclick = updateLikes;
    post.querySelector(".post-img-container").ondblclick = () => {
      updateLikes();
      const heart = post.querySelector(".heart-icon");
      heart.style.opacity = 1;
      setTimeout(() => heart.style.opacity = 0, 1000);
    };
    post.querySelector(".comment-btn").onclick = () => {
      const input = post.querySelector('input[type="text"]');
      if (input.value.trim()) {
        commentsEl.innerHTML += `<li>${input.value}</li>`;
        const comments = JSON.parse(localStorage.getItem(`comments-${id}`));
        comments.push(input.value.trim());
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
        input.value = "";
      }
    };
  });
});
