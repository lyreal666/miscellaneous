$.get("https://baike.baidu.com", {}).done((data) => {
    console.log("success");
}).fail(
    console.log("failed")
);