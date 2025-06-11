document.addEventListener("DOMContentLoaded", function () {
    const activeStep = document.querySelector(".step.active");
    if (activeStep) {
        activeStep.style.cursor = "pointer"; 
        activeStep.addEventListener("click", function () {
            window.location.href = "./pull-request.php";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const activeStep = document.querySelector(".step.completed");
    if (activeStep) {
        activeStep.style.cursor = "pointer"; 
        activeStep.addEventListener("click", function () {
            window.location.href = "./index.php";
        });
    }
});