const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getPriorityScore(notification) {

  const weight = TYPE_WEIGHT[notification.Type] || 0;

  const timestamp = new Date(notification.Timestamp).getTime();

  return weight * 1000000000000 + timestamp;
}

function getTopNotifications(notifications, limit = 10) {

  return notifications
    .sort(
      (a, b) =>
        getPriorityScore(b) -
        getPriorityScore(a)
    )
    .slice(0, limit);
}

module.exports = {
  getTopNotifications
};