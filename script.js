let currentWeight = "1 kg";

/* =========================
   PAGE NAVIGATION
========================= */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.style.display = "none";
  });

  document.getElementById("page-" + pageId).style.display = "block";
}

/* =========================
   WEIGHT SELECT
========================= */
function selWt(el) {
  document.querySelectorAll(".weight-opt").forEach(e => e.classList.remove("active"));
  el.classList.add("active");

  currentWeight = el.innerText;
}

/* =========================
   QUANTITY CONTROL
========================= */
function detQty(val) {
  let qty = document.getElementById("det-qty");
  let current = parseInt(qty.innerText);

  current = current + val;
  if (current < 1) current = 1;

  qty.innerText = current;
}

/* =========================
   TOTAL CALC
========================= */
function calculateTotal() {
  let price = parseInt(
    document.getElementById("det-price").innerText.replace("₹", "")
  );

  let qty = parseInt(document.getElementById("det-qty").innerText);

  return price * qty;
}

/* =========================
   PLACE ORDER (MAIN FUNCTION)
========================= */
async function placeOrder() {
  try {
    console.log("BUTTON CLICKED");

    const data = {
      customerName: document.getElementById("c-name").value,
      phone: document.getElementById("c-phone").value,
      address: document.getElementById("c-house").value,
      city: document.getElementById("c-city").value,
      pincode: document.getElementById("c-pin").value,

      product: document.getElementById("det-name")
        ? document.getElementById("det-name").innerText
        : "Chicken",

      weight: currentWeight,
      quantity: parseInt(document.getElementById("det-qty")?.innerText || 1),
      amount: calculateTotal()
    };

    console.log("SENDING DATA:", data);

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const result = await response.json();

    console.log("RESULT:", result);

    // success page move
    showPage("success");

  } catch (err) {
    console.error("ERROR:", err);
    alert("Order Failed");
  }
}


function clearError(input) {
  const error = input.parentElement.querySelector(".error-msg");
  if (error) error.remove();
  input.style.border = "";
}

function showLoading(state) {
  const btn = document.querySelector(".place-order-btn");

  if (!btn) return;

  if (state) {
    btn.disabled = true;
    btn.dataset.text = btn.textContent;
    btn.textContent = "Processing...";
    btn.style.opacity = "0.7";
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.text || "Place Order →";
    btn.style.opacity = "1";
  }
}

window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("cart")) || {};
  cart = saved;
  updateBadges();
});