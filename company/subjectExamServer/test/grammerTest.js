let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('123');
        resolve();
    }, 1000)
});

p.then();