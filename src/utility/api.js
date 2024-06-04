// 模擬獲取數據時間
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export async function getPost(postId) {
  let post = null;
  let error = null;

  try {
    await timeout();
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (res.ok) {
      // Promise resolved and HTTP status is successful
      post = await res.json();
    } else {
      // Custom message for failed HTTP codes
      if (res.status === 404) throw new Error('404, Not found');
      // For any other server error
      throw new Error(res.status);
    }
  } catch (err) {
    error = err.toString();
  }

  return {
    post,
    error,
  };
}
