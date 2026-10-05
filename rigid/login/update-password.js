/* =========================================================================
   RiGiD — UPDATE PASSWORD
   update-password.js

   Opened from the Supabase password-reset email link.
   supabase-js reads the recovery link and establishes the recovery
   session itself; no token is handled or stored manually here.
   Uses the shared client (window.sb) from ../supabase-client.js.
   ========================================================================= */

const UPDATE_PASSWORD_CONFIG = {

  MIN_PASSWORD_LENGTH:
    8,

  LOGIN_URL:
    "login.html",

  REDIRECT_DELAY_MS:
    1500

};


/* =========================================================================
   HELPER
   ========================================================================= */

function el(id) {

  return document.getElementById(id);

}


/* =========================================================================
   CLOCK
   ========================================================================= */

function startClock() {

  const clock =
    el("liveClock");

  if (!clock) {
    return;
  }

  function updateClock() {

    const now =
      new Date();

    clock.textContent =
      now.toLocaleDateString(
        undefined,
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      ) +
      " — " +
      now.toLocaleTimeString();

  }

  updateClock();

  setInterval(
    updateClock,
    1000
  );

}


/* =========================================================================
   THEME
   ========================================================================= */

function initTheme() {

  const button =
    el("themeToggle");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      const isDark =
        document.documentElement
          .classList
          .toggle("dark");

      localStorage.setItem(
        "logbook-theme",
        isDark
          ? "dark"
          : "light"
      );

      updateThemeIcon();

    }
  );

  updateThemeIcon();

}


function updateThemeIcon() {

  const icon =
    el("themeIcon");

  if (!icon) {
    return;
  }

  const isDark =
    document.documentElement
      .classList
      .contains("dark");

  icon.textContent =
    isDark
      ? "☀"
      : "☾";

}


/* =========================================================================
   MESSAGE
   ========================================================================= */

function showResetMessage(
  message,
  type = "error"
) {

  const box =
    el("resetMessage");

  if (!box) {
    return;
  }

  box.textContent =
    message;

  box.classList.remove(
    "hidden",
    "auth-message-error",
    "auth-message-ok"
  );

  box.classList.add(
    type === "ok"
      ? "auth-message-ok"
      : "auth-message-error"
  );

}


function clearResetMessage() {

  const box =
    el("resetMessage");

  if (!box) {
    return;
  }

  box.textContent =
    "";

  box.classList.add(
    "hidden"
  );

}


/* =========================================================================
   RECOVERY SESSION CHECK
   ========================================================================= */

async function checkRecoverySession() {

  try {

    const {
      data: {
        session
      }
    } = await sb.auth.getSession();


    if (!session) {

      showResetMessage(
        "This password reset link is invalid or has expired. Please request a new one from the login page."
      );

    }

  }

  catch {

    showResetMessage(
      "Unable to verify the password reset link. Please request a new one from the login page."
    );

  }

}


/* =========================================================================
   UPDATE PASSWORD
   ========================================================================= */

async function updatePassword(event) {

  event.preventDefault();

  clearResetMessage();


  const password =
    el("newPassword")?.value || "";

  const confirmPassword =
    el("confirmPassword")?.value || "";

  const button =
    el("updatePasswordBtn");


  if (
    password.length <
    UPDATE_PASSWORD_CONFIG.MIN_PASSWORD_LENGTH
  ) {

    showResetMessage(
      `Password must contain at least ${UPDATE_PASSWORD_CONFIG.MIN_PASSWORD_LENGTH} characters.`
    );

    return;

  }


  if (password !== confirmPassword) {

    showResetMessage(
      "Passwords do not match."
    );

    return;

  }


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Updating…";

  }


  try {

    const { error } =
      await sb.auth.updateUser({
        password
      });


    if (error) {

      showResetMessage(
        error.message ||
        "Unable to update your password."
      );

      if (button) {

        button.disabled =
          false;

        button.textContent =
          "Update Password";

      }

      return;

    }


    showResetMessage(
      "Your password has been updated successfully.",
      "ok"
    );


    el("updatePasswordForm")
      ?.reset();


    /*
     * End the recovery session so the login page starts clean
     * and the user signs in with the new password.
     */
    try {
      await sb.auth.signOut();
    }
    catch {
      /* Ignore sign-out failure; the password is already updated. */
    }


    setTimeout(
      () => {

        window.location.href =
          UPDATE_PASSWORD_CONFIG.LOGIN_URL;

      },
      UPDATE_PASSWORD_CONFIG.REDIRECT_DELAY_MS
    );

  }

  catch (error) {

    showResetMessage(
      error?.message ||
      "Unable to update your password."
    );

    if (button) {

      button.disabled =
        false;

      button.textContent =
        "Update Password";

    }

  }

}


/* =========================================================================
   INITIALIZATION
   ========================================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    startClock();

    initTheme();


    el("updatePasswordForm")
      ?.addEventListener(
        "submit",
        updatePassword
      );


    await checkRecoverySession();

  }
);
