const indicator = document.querySelector(".indicator");
const input = document.querySelector("input");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,),]/;

function trigger() {
  let no = 0; // Initialize the `no` variable

  if (input.value !== "") {
    indicator.style.display = "flex";

    // Weak: 1 condition met (length <= 3 or matches any of the regex patterns)
    if (
      (input.value.length <= 3 && input.value.match(regExpWeak)) ||
      input.value.match(regExpMedium) ||
      input.value.match(regExpStrong)
    ) {
      no = 1;
    }

    // Medium: 2 conditions met
    if (
      (input.value.length >= 6 &&
        input.value.match(regExpWeak) &&
        input.value.match(regExpMedium)) ||
      (input.value.match(regExpMedium) && input.value.match(regExpStrong)) ||
      (input.value.match(regExpWeak) && input.value.match(regExpStrong))
    ) {
      no = 2;
    }

    // Strong: all 3 conditions met
    if (
      input.value.length >= 6 &&
      input.value.match(regExpWeak) &&
      input.value.match(regExpMedium) &&
      input.value.match(regExpStrong)
    ) {
      no = 3;
    }

    // Update UI based on the strength
    if (no === 1) {
      weak.classList.add("active");
      medium.classList.remove("active");
      strong.classList.remove("active");
      text.style.display = "block";
      text.textContent = "Your password is too weak";
      text.classList.remove("medium", "strong");
      text.classList.add("weak");
    } else if (no === 2) {
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.remove("active");
      text.style.display = "block";
      text.textContent = "Your password is medium";
      text.classList.remove("weak", "strong");
      text.classList.add("medium");
    } else if (no === 3) {
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.add("active");
      text.style.display = "block";
      text.textContent = "Your password is strong";
      text.classList.remove("weak", "medium");
      text.classList.add("strong");
    }
  } else {
    indicator.style.display = "none"; // Hide the indicator when input is empty
    text.style.display = "none"; // Hide the text when input is empty
  }
}
