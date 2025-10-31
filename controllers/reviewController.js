const db = require('../firebase/config');

exports.getReviews = async (req, res) => {
  const { itemId } = req.params;
  const snapshot = await db.collection('reviews').where('itemId', '==', itemId).get();
  const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  const newReview = req.body;
  const docRef = await db.collection('reviews').add(newReview);
  res.json({ id: docRef.id });
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  await db.collection('reviews').doc(reviewId).update(req.body);
  res.json({ message: 'Review updated' });
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  await db.collection('reviews').doc(reviewId).delete();
  res.json({ message: 'Review deleted' });
};