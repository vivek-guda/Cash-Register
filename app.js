const nextBtn = document.querySelector("#next-btn");
const checkBtn = document.querySelector("#check-btn");
const billAmtInp = document.querySelector("#bill-amt-inp");
const cashGivenInp = document.querySelector("#cash-given-inp");
const billAmt = document.querySelector("#bill-amt");
const cashGiven = document.querySelector("#cash-given");

const amtReturn = document.querySelector("#amt-return");
const noOfNotes = document.querySelectorAll(".noOfNotes");

const errMsgDiv = document.querySelector("#err-msg");

const notesArray = [2000, 500, 100, 20, 10, 5, 1];

function hideErrMsg() {
  errMsgDiv.style.display = "none";
}

function showErrMsg(text) {
  errMsgDiv.style.display = "block";
  errMsgDiv.innerText = text;
}

function calculateAmtReturn(bill, cash) {
  let returnAmt = cash - bill;
  if (returnAmt === 0) {
    showErrMsg("No amount should be returned");
  } else {
    amtReturn.style.display = "block";
    for (let i = 0; i < notesArray.length; i++) {
      returnAmt = update(returnAmt, notesArray[i], i);
    }
  }
}

function update(rem, noteAmt, index) {
  if (rem >= noteAmt) {
    let notes = Math.floor(rem / noteAmt);
    rem = rem - notes * noteAmt;
    noOfNotes[index].innerText = `${notes}`;
  }
  return rem;
}

function clearNotes() {
  for (let note of noOfNotes) {
    note.innerText = "";
  }
}

nextBtn.addEventListener("click", () => {
  hideErrMsg();
  if (Number(billAmtInp.value) > 0) {
    nextBtn.style.display = "none";
    cashGiven.style.display = "block";
  } else {
    showErrMsg("Please enter valid bill amount");
  }
});

checkBtn.addEventListener("click", () => {
  hideErrMsg();
  clearNotes();
  let billAmtValue = Number(billAmtInp.value);
  let cashGivenValue = Number(cashGivenInp.value);

  if (billAmtValue > 0 && cashGivenValue > 0) {
    if (billAmtValue > cashGivenValue) {
      showErrMsg(
        "Cash given is less than the bill amount, please enter right amount"
      );
    } else {
      calculateAmtReturn(billAmtValue, cashGivenValue);
    }
  } else {
    showErrMsg("Please enter valid bill amount and cash given");
  }
});
