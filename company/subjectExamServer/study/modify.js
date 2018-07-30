if (subject.trim() === '科目一') {
    const oldSubject1wrong = user.subject1wrong.trim();
    if (oldSubject1wrong) {
        user.subject1wrong = JSON.stringify(JSON.parse(oldSubject1wrong).push(newItem));
    } else {
        user.subject1wrong = JSON.stringify([newItem])
    }
} else {
    const oldSubject4wrong = user.subject4wrong.trim();
    if (oldSubject4wrong) {
        user.subject4wrong = JSON.stringify(JSON.parse(oldSubject4wrong).push(newItem));
    } else {
        user.subject4wrong = JSON.stringify([newItem])
    }
}
