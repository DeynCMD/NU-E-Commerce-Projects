const baseUrl = 'http://localhost/NUBEX/NU-E-Commerce-Project/backend/';

// Load all reviews from the server
async function loadReviews() {
  try {
    const res = await fetch(baseUrl + 'get_reviews.php');
    const data = await res.json();
    const reviewList = document.getElementById('reviewList');

    if (!reviewList) return;

    reviewList.innerHTML = '';

    if (Array.isArray(data) && data.length > 0) {
      data.forEach(item => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        reviewItem.innerHTML = `
          <div class="review-content">
            <div class="review-author">${item.username}</div>
            <div class="review-text">${item.review_text}</div>
            <div class="underline-text"></div>
          </div>
          ${item.is_own_review ? `<button class="delete-btn" data-id="${item.id}">Delete</button>` : ''}
        `;

        reviewList.appendChild(reviewItem);
      });

      // Attach delete event listeners
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const reviewId = e.target.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this review?')) {
            await deleteReview(reviewId);
          }
        });
      });

    } else {
      reviewList.innerHTML = '<p>No reviews yet.</p>';
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

// Submit a new review
async function postReview() {
  const input = document.getElementById('reviewInput');
  const reviewText = input?.value.trim();

  if (!reviewText) {
    alert("Please write something in the review.");
    return;
  }

  try {
    const response = await fetch(baseUrl + 'submit-review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'review=' + encodeURIComponent(reviewText)
    });

    const result = await response.json();

    if (result.status === 'success') {
      input.value = '';
      loadReviews();
    } else {
      alert(result.message || 'Error submitting review.');
    }
  } catch (error) {
    console.error('Failed to submit review:', error);
    alert("Failed to connect to the server.");
  }
}

// Delete review by ID
async function deleteReview(reviewId) {
  try {
    const response = await fetch(baseUrl + 'delete_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'review_id=' + encodeURIComponent(reviewId)
    });

    const result = await response.json();

    if (result.status === 'success') {
      loadReviews();
    } else {
      alert(result.message || 'Failed to delete review.');
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    alert('Failed to connect to the server.');
  }
}

// Hook up event listener for the submit button
document.addEventListener('DOMContentLoaded', () => {
  loadReviews();

  const submitBtn = document.getElementById('submitReviewBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', postReview);
  }

  // Optional: Allow pressing "Enter" to submit
  document.getElementById('reviewInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      postReview();
    }
  });
});
