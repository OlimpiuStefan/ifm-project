function getUser(userId, done) {
  setTimeout(() => {
    if (!userId) {
      done(new Error('userId is required'));
      return;
    }

    done(null, {
      id: userId,
      name: 'Ana',
    });
  }, 300);
}

function getOrders(userId, done) {
  setTimeout(() => {
    if (userId !== 1) {
      done(new Error('user not found'));
      return;
    }

    done(null, [
      { id: 101, total: 120 },
      { id: 102, total: 80 },
    ]);
  }, 300);
}

function getOrderDetails(orderId, done) {
  setTimeout(() => {
    if (orderId !== 101) {
      done(new Error('order not found'));
      return;
    }

    done(null, {
      id: 101,
      items: [
        { name: 'Keyboard', price: 70 },
        { name: 'Mouse', price: 50 },
      ],
    });
  }, 300);
}

getUser(1, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }
  getOrders(user.id, (error, orders) => {
    if (error) {
      console.error(error);
      return;
    }
    getOrderDetails(orders[0].id, (error, details) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(details);
    });
  });
});

getUser()
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => console.log(details))
  .catch((err) => console.log(err));
