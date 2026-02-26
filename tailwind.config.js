/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    'status-PAID',
    'status-UNPAID',
    'status-IN_PROGRESS_DELIVERY',
    'status-DELIVERED',
    'status-CANCELED'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

