const appConfig = {
  supabaseUrl: 'https://omqzpjnzuhjvdjtxdqiu.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcXpwam56dWhqdmRqdHhkcWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NTYwMTksImV4cCI6MjEwNzUzMjAxOX0.Gier2YVMOwtpWt5FiN3IeEnDJR7n1ann3Pit55Lxx-o',
};

const defaultWalletId = '00000000-0000-0000-0000-000000000001';

window.appConfig = appConfig;
window.__fintrackDebug = { appConfig, supabaseClient: null, defaultWalletId };

const demoTransactions = [
  { id: 1, wallet_id: defaultWalletId, user_id: 'demo-user-1', date: '2026-10-10', category: 'Gaji', description: 'Pendapatan bulanan', amount: 5000000, type: 'income' },
  { id: 2, wallet_id: defaultWalletId, user_id: 'demo-user-1', date: '2026-10-11', category: 'Makanan', description: 'Belanja kebutuhan harian', amount: 350000, type: 'expense' },
  { id: 3, wallet_id: defaultWalletId, user_id: 'demo-user-2', date: '2026-10-12', category: 'Transport', description: 'Bensin & ojek', amount: 250000, type: 'expense' },
  { id: 4, wallet_id: defaultWalletId, user_id: 'demo-user-2', date: '2026-10-12', category: 'Freelance', description: 'Project tambahan', amount: 1200000, type: 'income' },
  { id: 5, wallet_id: defaultWalletId, user_id: 'demo-user-3', date: '2026-10-13', category: 'Tagihan', description: 'Internet & listrik', amount: 420000, type: 'expense' },
];

const demoBudgetPlans = [
  { id: 'budget-demo-1', wallet_id: defaultWalletId, user_id: 'demo-user-1', month: '2026-10', category: 'Makanan', type: 'expense', amount: 1500000, note: 'Kebutuhan harian' },
  { id: 'budget-demo-2', wallet_id: defaultWalletId, user_id: 'demo-user-1', month: '2026-10', category: 'Transport', type: 'expense', amount: 1200000, note: 'Bensin & ojek' },
];

const state = {
  authMode: 'login',
  session: null,
  transactions: [...demoTransactions],
  budgetPlans: [...demoBudgetPlans],
  wallets: [{ id: defaultWalletId, name: 'Dompet Utama' }],
  editingTransactionId: null,
  filterType: 'all',
  monthFilter: '',
  userFilter: 'all',
  activeView: 'overview',
  userLookup: {},
  reportFilters: {
    period: 'monthly',
    wallet: 'all',
    category: 'all',
    subcategory: 'all',
    tag: '',
    startDate: '',
    endDate: '',
  },
};

const authSection = document.getElementById('authSection');
const dashboardSection = document.getElementById('dashboardSection');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const viewSections = {
  overview: document.getElementById('overviewView'),
  transactions: document.getElementById('transactionsView'),
  budget: document.getElementById('budgetView'),
  reports: document.getElementById('reportsView'),
  settings: document.getElementById('settingsView'),
};
const logoutBtn = document.getElementById('logoutBtn');
const statusBadge = document.getElementById('statusBadge');
const authTitle = document.getElementById('authTitle');
const authToggleText = document.getElementById('authToggleText');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const accountMenu = document.getElementById('accountMenu');
const summaryFeatureButton = document.getElementById('summaryFeatureButton');
const summaryFeatureMenu = document.getElementById('summaryFeatureMenu');
const reportDashboardContent = document.getElementById('reportDashboardContent');
const reportOverviewSubView = document.getElementById('reportOverviewSubView');
const reportVisualSubView = document.getElementById('reportVisualSubView');
const reportBudgetSubView = document.getElementById('reportBudgetSubView');
const reportFilterSubView = document.getElementById('reportFilterSubView');
const reportOverviewBackButton = document.getElementById('reportOverviewBackButton');
const reportVisualBackButton = document.getElementById('reportVisualBackButton');
const reportBudgetBackButton = document.getElementById('reportBudgetBackButton');
const reportFilterBackButton = document.getElementById('reportFilterBackButton');
const reportOverviewTotalBalance = document.getElementById('reportOverviewTotalBalance');
const reportWalletBreakdown = document.getElementById('reportWalletBreakdown');
const reportIncomeValue = document.getElementById('reportIncomeValue');
const reportExpenseValue = document.getElementById('reportExpenseValue');
const reportNetValue = document.getElementById('reportNetValue');
const reportSavingsRateValue = document.getElementById('reportSavingsRateValue');
const reportOverviewHealthBadge = document.getElementById('reportOverviewHealthBadge');
const reportFinancialHealthText = document.getElementById('reportFinancialHealthText');
const reportBudgetList = document.getElementById('reportBudgetList');
const reportDetailSubView = document.getElementById('reportDetailSubView');
const reportDetailBackButton = document.getElementById('reportDetailBackButton');
const reportDetailSearch = document.getElementById('reportDetailSearch');
const reportDetailSort = document.getElementById('reportDetailSort');
const reportDetailTableBody = document.getElementById('reportDetailTableBody');
const reportDetailPdfButton = document.getElementById('reportDetailPdfButton');
const reportDetailCsvButton = document.getElementById('reportDetailCsvButton');
const reportDetailSearchFull = document.getElementById('reportDetailSearchFull');
const reportDetailSortFull = document.getElementById('reportDetailSortFull');
const reportDetailTableBodyFull = document.getElementById('reportDetailTableBodyFull');
const reportDetailPdfButtonFull = document.getElementById('reportDetailPdfButtonFull');
const reportDetailCsvButtonFull = document.getElementById('reportDetailCsvButtonFull');
const expenseDonutChart = document.getElementById('expenseDonutChart');
const incomeDonutChart = document.getElementById('incomeDonutChart');
const monthlyComparisonChart = document.getElementById('monthlyComparisonChart');
const dailyExpenseChart = document.getElementById('dailyExpenseChart');
const reportFilterSummary = document.getElementById('reportFilterSummary');
const reportWalletFilter = document.getElementById('reportWalletFilter');
const reportCategoryFilter = document.getElementById('reportCategoryFilter');
const reportSubcategoryFilter = document.getElementById('reportSubcategoryFilter');
const reportTagFilter = document.getElementById('reportTagFilter');
const reportStartDate = document.getElementById('reportStartDate');
const reportEndDate = document.getElementById('reportEndDate');
const reportCustomDateRange = document.getElementById('reportCustomDateRange');
const reportFilterApplyButton = document.getElementById('reportFilterApplyButton');
const reportFilterResetButton = document.getElementById('reportFilterResetButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const transactionForm = document.getElementById('transactionForm');
const transactionRowsContainer = document.getElementById('transactionRowsContainer');
const addTransactionRowButton = document.getElementById('addTransactionRowButton');
const transactionTableBody = document.getElementById('transactionTableBody');
const balanceValue = document.getElementById('balanceValue');
const incomeValue = document.getElementById('incomeValue');
const expenseValue = document.getElementById('expenseValue');
const transactionCount = document.getElementById('transactionCount');
const toast = document.getElementById('toast');
const refreshButton = document.getElementById('refreshButton');
const transactionFormTitle = document.getElementById('transactionFormTitle');
const submitTransactionButton = document.getElementById('submitTransactionButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const filterTypeSelect = document.getElementById('filterType');
const monthFilterInput = document.getElementById('monthFilter');
const userFilterSelect = document.getElementById('userFilter');
const summaryIncome = document.getElementById('summaryIncome');
const summaryExpense = document.getElementById('summaryExpense');
const summaryBalance = document.getElementById('summaryBalance');
const summaryVisibleCount = document.getElementById('summaryVisibleCount');
const overviewTransactionList = document.getElementById('overviewTransactionList');
const monthlyChart = document.getElementById('monthlyChart');
const categorySummaryList = document.getElementById('categorySummaryList');
const userBreakdownList = document.getElementById('userBreakdownList');
const categoryBreakdownList = document.getElementById('categoryBreakdownList');
const profileNameInput = document.getElementById('profileName');
const profileEmailInput = document.getElementById('profileEmail');
const profileTargetInput = document.getElementById('profileTarget');
const saveProfileButton = document.getElementById('saveProfileButton');
const exportCsvButton = document.getElementById('exportCsvButton');
const budgetForm = document.getElementById('budgetForm');
const budgetMonthInput = document.getElementById('budgetMonth');
const budgetRowsContainer = document.getElementById('budgetRowsContainer');
const budgetCategoryInput = document.getElementById('budgetCategory');
const budgetTypeInput = document.getElementById('budgetType');
const budgetAmountInput = document.getElementById('budgetAmount');
const budgetNoteInput = document.getElementById('budgetNote');
const budgetPlanList = document.getElementById('budgetPlanList');
const themeToggle = document.getElementById('themeToggle');
const categoryOptionGrid = document.querySelector('.category-option-grid');
const budgetCategoryOptionGrid = document.querySelector('.budget-category-option-grid');
const defaultCategoryOptions = ['Gaji', 'Makanan', 'Transport', 'Tagihan', 'Belanja', 'Lainnya'];

const applyTheme = (themeName) => {
  const nextTheme = themeName === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = nextTheme;
  localStorage.setItem('fintrackTheme', nextTheme);

  if (themeToggle) {
    const icon = nextTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.innerHTML = `<span aria-hidden="true">${icon}</span>`;
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('fintrackTheme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (preferredDark ? 'dark' : 'light');
  applyTheme(initialTheme);
};

const applyTransactionsMobileLayout = () => {
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 560px)').matches;
  const table = document.querySelector('.panel-table table');

  if (!table) {
    return;
  }

  const header = table.querySelector('thead');
  const body = table.querySelector('tbody');
  const rows = table.querySelectorAll('tr');
  const cells = table.querySelectorAll('td, th');

  if (isMobile) {
    table.style.display = 'block';
    table.style.width = '100%';
    table.style.minWidth = '0';
    table.style.tableLayout = 'fixed';

    if (header) {
      header.style.display = 'none';
    }

    if (body) {
      body.style.display = 'flex';
      body.style.flexDirection = 'column';
      body.style.gap = '12px';
    }

    rows.forEach((row) => {
      row.style.display = 'block';
      row.style.width = '100%';
      row.style.background = 'rgba(255, 255, 255, 0.72)';
      row.style.border = '1px solid rgba(148, 163, 184, 0.18)';
      row.style.borderRadius = '16px';
      row.style.padding = '12px 14px';
      row.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.04)';
    });

    cells.forEach((cell) => {
      if (cell.tagName === 'TH') {
        cell.style.display = 'none';
        return;
      }

      const label = cell.dataset.label || cell.getAttribute('data-label');
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'space-between';
      cell.style.gap = '8px';
      cell.style.padding = '8px 0';
      cell.style.border = 'none';
      cell.style.background = 'transparent';
      cell.style.wordBreak = 'break-word';

      if (label) {
        cell.setAttribute('data-label', label);
      }
    });
  } else {
    table.style.display = '';
    table.style.width = '';
    table.style.minWidth = '';
    table.style.tableLayout = '';

    if (header) {
      header.style.display = '';
    }

    if (body) {
      body.style.display = '';
      body.style.flexDirection = '';
      body.style.gap = '';
    }

    rows.forEach((row) => {
      row.style.display = '';
      row.style.width = '';
      row.style.background = '';
      row.style.border = '';
      row.style.borderRadius = '';
      row.style.padding = '';
      row.style.boxShadow = '';
    });

    cells.forEach((cell) => {
      if (cell.tagName === 'TH') {
        cell.style.display = '';
        return;
      }

      cell.style.display = '';
      cell.style.alignItems = '';
      cell.style.justifyContent = '';
      cell.style.gap = '';
      cell.style.padding = '';
      cell.style.border = '';
      cell.style.background = '';
      cell.style.wordBreak = '';
    });
  }
};

window.addEventListener('resize', applyTransactionsMobileLayout);

const getStoredCategoryOptions = () => {
  const savedOptions = JSON.parse(localStorage.getItem('fintrackCategoryOptions') || 'null');
  const categories = Array.isArray(savedOptions) ? savedOptions : [...defaultCategoryOptions];
  const mergedCategories = [...new Set([...defaultCategoryOptions, ...categories, ...state.transactions.map((item) => item.category).filter(Boolean)])]
    .map((category) => String(category).trim())
    .filter(Boolean);

  if (mergedCategories.length !== categories.length || mergedCategories.some((category, index) => category !== categories[index])) {
    localStorage.setItem('fintrackCategoryOptions', JSON.stringify(mergedCategories));
  }

  return mergedCategories;
};

const persistCategoryOptions = (categories) => {
  const nextCategories = [...new Set(categories.map((category) => String(category).trim()).filter(Boolean))];
  localStorage.setItem('fintrackCategoryOptions', JSON.stringify(nextCategories));
  return nextCategories;
};

const renderCategoryButtons = () => {
  if (!categoryOptionGrid) {
    return;
  }

  const selectedCategory = document.getElementById('transactionCategory')?.value.trim() || '';
  const categories = getStoredCategoryOptions();

  categoryOptionGrid.innerHTML = categories
    .map((category) => `
      <button type="button" class="chip-card ${category === selectedCategory ? 'selected' : ''}" data-category-option="${category}">
        <span class="chip-label">${category}</span>
        <span class="chip-remove" aria-label="Hapus kategori ${category}" title="Hapus kategori">×</span>
      </button>
    `)
    .join('');
};

const renderBudgetCategoryButtons = () => {
  if (!budgetCategoryOptionGrid) {
    return;
  }

  const selectedCategory = budgetCategoryInput?.value.trim() || '';
  const categories = getStoredCategoryOptions();

  budgetCategoryOptionGrid.innerHTML = categories
    .map((category) => `
      <button type="button" class="chip-card ${category === selectedCategory ? 'selected' : ''}" data-budget-category-option="${category}">
        <span class="chip-label">${category}</span>
        <span class="chip-remove" aria-label="Hapus kategori ${category}" title="Hapus kategori">×</span>
      </button>
    `)
    .join('');
};

const syncBudgetTypeButtons = () => {
  const selectedType = budgetTypeInput?.value || 'expense';
  document.querySelectorAll('[data-budget-type]').forEach((button) => {
    const isSelected = button.dataset.budgetType === selectedType;
    button.classList.toggle('selected', isSelected);
  });
};

const syncBudgetCategoryButtons = () => {
  const currentCategory = budgetCategoryInput?.value.trim() || '';
  document.querySelectorAll('[data-budget-category-option]').forEach((button) => {
    const isSelected = button.dataset.budgetCategoryOption === currentCategory;
    button.classList.toggle('selected', isSelected);
  });
};

const removeCategoryOption = (categoryToRemove) => {
  const category = String(categoryToRemove || '').trim();
  if (!category) {
    return;
  }

  if (defaultCategoryOptions.includes(category)) {
    showToast('Kategori bawaan tidak bisa dihapus.');
    return;
  }

  const currentCategories = getStoredCategoryOptions().filter((categoryName) => categoryName !== category);
  persistCategoryOptions(currentCategories);

  const transactionCategoryInput = document.getElementById('transactionCategory');
  if (transactionCategoryInput && transactionCategoryInput.value.trim() === category) {
    transactionCategoryInput.value = '';
  }

  if (budgetCategoryInput && budgetCategoryInput.value.trim() === category) {
    budgetCategoryInput.value = '';
  }

  renderCategoryButtons();
  renderBudgetCategoryButtons();
  syncCategoryButtons();
  syncBudgetCategoryButtons();
  showToast('Kategori berhasil dihapus.');
};

const upsertCustomCategory = (rawCategory) => {
  const newCategory = String(rawCategory || '').trim();
  if (!newCategory) {
    return;
  }

  const currentCategories = getStoredCategoryOptions();
  if (!currentCategories.includes(newCategory)) {
    persistCategoryOptions([...currentCategories, newCategory]);
  }

  renderCategoryButtons();
  renderBudgetCategoryButtons();
  syncCategoryButtons();
  syncBudgetCategoryButtons();
};

const isSupabaseConfigured = () => {
  return (
    appConfig.supabaseUrl &&
    appConfig.supabaseUrl.includes('supabase.co') &&
    appConfig.supabaseAnonKey &&
    !appConfig.supabaseAnonKey.includes('your-')
  );
};

let fintrackSupabase = null;

try {
  if (isSupabaseConfigured() && window.supabase) {
    fintrackSupabase = window.supabase.createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey);
  }
} catch (error) {
  console.warn('Supabase client initialization failed:', error);
}

window.supabaseClient = fintrackSupabase;
window.__fintrackDebug.supabaseClient = fintrackSupabase;

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value || 0);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

const setAuthMode = (mode) => {
  state.authMode = mode;
  const isLogin = mode === 'login';

  authTitle.textContent = isLogin ? 'Masuk' : 'Daftar';
  authToggleText.textContent = isLogin ? 'Belum punya akun?' : 'Sudah punya akun?';
  toggleAuthMode.textContent = isLogin ? 'Daftar sekarang' : 'Masuk sekarang';
  loginForm.classList.toggle('hidden', !isLogin);
  registerForm.classList.toggle('hidden', isLogin);
};

const restoreReportsDefaultView = () => {
  if (reportDashboardContent) {
    reportDashboardContent.classList.remove('hidden');
  }

  if (reportOverviewSubView) {
    reportOverviewSubView.classList.add('hidden');
  }

  if (reportVisualSubView) {
    reportVisualSubView.classList.add('hidden');
  }

  if (reportBudgetSubView) {
    reportBudgetSubView.classList.add('hidden');
  }

  if (reportDetailSubView) {
    reportDetailSubView.classList.add('hidden');
  }

  if (reportFilterSubView) {
    reportFilterSubView.classList.add('hidden');
  }
};

const setActiveView = (viewName) => {
  const validView = Object.prototype.hasOwnProperty.call(viewSections, viewName) ? viewName : 'overview';
  state.activeView = validView;

  Object.entries(viewSections).forEach(([key, section]) => {
    if (section) {
      section.classList.toggle('hidden', key !== validView);
    }
  });

  if (validView === 'reports') {
    restoreReportsDefaultView();
  }

  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.view === validView);
  });
};

const getCurrentUserId = () => state.session?.user?.id || null;

const bindTransactionRowRemoveActions = (row) => {
  const removeButton = row.querySelector('.transaction-row-remove');
  if (!removeButton || removeButton.dataset.bound === 'true') {
    return;
  }

  removeButton.dataset.bound = 'true';
  removeButton.addEventListener('click', () => {
    const remainingRows = transactionRowsContainer?.querySelectorAll('.transaction-row') || [];
    if (remainingRows.length <= 1) {
      row.querySelector('.transaction-row-category').value = '';
      row.querySelector('.transaction-row-description').value = '';
      row.querySelector('.transaction-row-type').value = document.getElementById('transactionType')?.value || 'expense';
      row.querySelector('.transaction-row-amount').value = '';
      return;
    }

    row.remove();
  });
};

const syncRowTypeToggleState = (row) => {
  const typeInput = row.querySelector('.transaction-row-type');
  const typeButtons = row.querySelectorAll('.type-toggle-btn');
  if (!typeInput || typeButtons.length === 0) {
    return;
  }

  const selectedType = typeInput.value || 'expense';
  typeButtons.forEach((button) => {
    const isActive = button.dataset.rowType === selectedType;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const createTransactionRow = (initialValues = {}) => {
  const row = document.createElement('div');
  row.className = 'transaction-row';
  row.innerHTML = `
    <div class="transaction-row-fields">
      <div class="field-group compact-field transaction-row-category-wrap">
        <span class="field-label">Kategori</span>
        <div class="transaction-row-category-options"></div>
        <input type="text" class="transaction-row-category" placeholder="Kategori" />
      </div>

      <label class="field-group compact-field">
        <span class="field-label">Deskripsi</span>
        <input type="text" class="transaction-row-description" placeholder="Keterangan" />
      </label>

      <div class="field-group compact-field">
        <span class="field-label">Jenis</span>
        <div class="transaction-row-type-toggle" aria-label="Jenis transaksi baris">
          <button type="button" class="type-toggle-btn" data-row-type="income">Pemasukan</button>
          <button type="button" class="type-toggle-btn" data-row-type="expense">Pengeluaran</button>
          <input type="hidden" class="transaction-row-type" value="expense" />
        </div>
      </div>

      <label class="field-group compact-field">
        <span class="field-label">Nominal</span>
        <div class="currency-wrap">
          <span class="currency-symbol">Rp</span>
          <input type="text" class="transaction-row-amount" inputmode="numeric" pattern="[0-9]*" min="1" placeholder="500000" />
        </div>
      </label>
    </div>
    <button type="button" class="btn btn-secondary btn-small transaction-row-remove" aria-label="Hapus baris">✕</button>
  `;

  const categoryInput = row.querySelector('.transaction-row-category');
  const descriptionInput = row.querySelector('.transaction-row-description');
  const typeInput = row.querySelector('.transaction-row-type');
  const amountInput = row.querySelector('.transaction-row-amount');
  const categoryOptionsWrap = row.querySelector('.transaction-row-category-options');
  const typeButtons = row.querySelectorAll('.type-toggle-btn');

  categoryInput.value = initialValues.category || '';
  descriptionInput.value = initialValues.description || '';
  typeInput.value = initialValues.type || 'expense';
  amountInput.value = initialValues.amount || '';

  typeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      typeInput.value = button.dataset.rowType;
      syncRowTypeToggleState(row);
    });
  });

  syncRowTypeToggleState(row);

  const renderRowCategoryOptions = () => {
    const categories = getStoredCategoryOptions();
    categoryOptionsWrap.innerHTML = categories
      .map(
        (category) => `
          <button type="button" class="chip-card ${category === categoryInput.value ? 'selected' : ''}" data-category-option="${category}">
            <span class="chip-label">${category}</span>
            <span class="chip-remove" aria-label="Hapus kategori ${category}" title="Hapus kategori">×</span>
          </button>
        `
      )
      .join('');
  };

  renderRowCategoryOptions();

  categoryOptionsWrap.addEventListener('click', (event) => {
    const removeTrigger = event.target.closest('.chip-remove');
    if (removeTrigger) {
      event.preventDefault();
      const chip = removeTrigger.closest('[data-category-option]');
      if (!chip) return;
      const category = chip.dataset.categoryOption;
      removeCategoryOption(category);
      if (categoryInput.value === category) {
        categoryInput.value = '';
      }
      renderRowCategoryOptions();
      return;
    }

    const button = event.target.closest('[data-category-option]');
    if (!button) return;
    categoryInput.value = button.dataset.categoryOption;
    renderRowCategoryOptions();
  });

  categoryInput.addEventListener('change', () => {
    if (categoryInput.value.trim()) {
      upsertCustomCategory(categoryInput.value);
    }
    renderRowCategoryOptions();
  });

  categoryInput.addEventListener('blur', () => {
    if (categoryInput.value.trim()) {
      upsertCustomCategory(categoryInput.value);
    }
    renderRowCategoryOptions();
  });

  bindTransactionRowRemoveActions(row);

  return row;
};

const seedTransactionRows = () => {
  if (!transactionRowsContainer) {
    return;
  }

  transactionRowsContainer.innerHTML = '';
  transactionRowsContainer.appendChild(createTransactionRow({ type: document.getElementById('transactionType')?.value || 'expense' }));

  const firstRow = transactionRowsContainer.querySelector('.transaction-row');
  if (firstRow) {
    const typeSelect = firstRow.querySelector('.transaction-row-type');
    if (typeSelect && !typeSelect.value) {
      typeSelect.value = document.getElementById('transactionType')?.value || 'expense';
    }
  }
};

const getBulkTransactionPayloads = () => {
  if (!transactionRowsContainer) {
    return [];
  }

  const rows = [...transactionRowsContainer.querySelectorAll('.transaction-row')];
  const sharedDate = document.getElementById('transactionDate')?.value || '';
  const userId = getCurrentUserId();

  return rows
    .map((row) => {
      const category = row.querySelector('.transaction-row-category')?.value.trim() || '';
      const description = row.querySelector('.transaction-row-description')?.value.trim() || '';
      const type = row.querySelector('.transaction-row-type')?.value || 'expense';
      const amount = normalizeAmount(row.querySelector('.transaction-row-amount')?.value || '');

      if (!category || !description || !sharedDate || amount < 1) {
        return null;
      }

      return {
        wallet_id: defaultWalletId,
        user_id: userId,
        date: sharedDate,
        category,
        description,
        type,
        amount,
      };
    })
    .filter(Boolean);
};

const resetTransactionForm = () => {
  state.editingTransactionId = null;
  transactionForm.reset();
  if (transactionRowsContainer) {
    transactionRowsContainer.innerHTML = '';
    transactionRowsContainer.appendChild(createTransactionRow({ type: 'expense' }));
  }
  document.getElementById('transactionType').value = 'income';
  renderCategoryButtons();
  syncTransactionTypeButtons();
  syncCategoryButtons();
  transactionFormTitle.textContent = 'Tambah Transaksi';
  submitTransactionButton.textContent = 'Simpan transaksi';
  cancelEditButton.classList.add('hidden');
};

const syncTransactionTypeButtons = () => {
  const selectedType = document.getElementById('transactionType').value;
  document.querySelectorAll('[data-option-type]').forEach((button) => {
    const isSelected = button.dataset.optionType === selectedType;
    button.classList.toggle('selected', isSelected);
  });
};

const syncCategoryButtons = () => {
  const transactionCategoryInput = document.getElementById('transactionCategory');
  if (!transactionCategoryInput) {
    document.querySelectorAll('[data-category-option]').forEach((button) => {
      button.classList.remove('selected');
    });
    return;
  }

  const currentCategory = transactionCategoryInput.value.trim();
  document.querySelectorAll('[data-category-option]').forEach((button) => {
    const isSelected = button.dataset.categoryOption === currentCategory;
    button.classList.toggle('selected', isSelected);
  });
};

const sanitizeNumericInput = (value) => String(value ?? '').replace(/[^\d]/g, '');

const normalizeAmount = (value) => {
  const cleaned = sanitizeNumericInput(value);
  return cleaned === '' ? 0 : Number(cleaned);
};

const getTransactionPayload = () => {
  const userId = getCurrentUserId();
  const firstRow = transactionRowsContainer?.querySelector('.transaction-row');
  const legacyDate = document.getElementById('transactionDate')?.value || '';
  const legacyCategory = document.getElementById('transactionCategory')?.value.trim() || '';
  const legacyDescription = document.getElementById('transactionDescription')?.value.trim() || '';
  const legacyType = document.getElementById('transactionType')?.value || 'expense';
  const legacyAmount = normalizeAmount(document.getElementById('transactionAmount')?.value || '');

  const rowCategory = firstRow?.querySelector('.transaction-row-category')?.value.trim() || legacyCategory;
  const rowDescription = firstRow?.querySelector('.transaction-row-description')?.value.trim() || legacyDescription;
  const rowType = firstRow?.querySelector('.transaction-row-type')?.value || legacyType;
  const rowAmount = normalizeAmount(firstRow?.querySelector('.transaction-row-amount')?.value || String(legacyAmount));

  const payload = {
    wallet_id: defaultWalletId,
    date: legacyDate,
    category: rowCategory,
    description: rowDescription,
    type: rowType,
    amount: rowAmount,
  };

  if (userId) {
    payload.user_id = userId;
  }

  return payload;
};

const getSessionDisplayName = () => {
  const preferredName = state.session?.user?.user_metadata?.full_name || state.session?.user?.user_metadata?.name;
  if (preferredName && String(preferredName).trim()) {
    return String(preferredName).trim();
  }

  const email = state.session?.user?.email;
  if (email && email.includes('@')) {
    return email.split('@')[0];
  }

  return 'Pengguna';
};

const getUserDisplayName = (userId) => {
  const profile = state.userLookup?.[userId];
  const fullName = profile?.full_name || profile?.name || profile?.display_name;

  if (fullName && String(fullName).trim()) {
    return String(fullName).trim();
  }

  if (profile?.email) {
    return profile.email.split('@')[0];
  }

  if (state.session?.user?.id === userId) {
    return getSessionDisplayName();
  }

  if (!userId) {
    return 'Tidak diketahui';
  }

  return `User ${String(userId).slice(0, 8)}`;
};

const syncCurrentProfileName = async () => {
  if (!fintrackSupabase || !state.session?.user) {
    return;
  }

  const user = state.session.user;
  const userId = user.id;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Pengguna');

  try {
    const { data, error } = await fintrackSupabase
      .from('profiles')
      .upsert({ id: userId, full_name: fullName }, { onConflict: 'id' })
      .select();

    if (error) throw error;

    if (data && data[0]) {
      state.userLookup[userId] = {
        ...state.userLookup[userId],
        id: userId,
        full_name: data[0].full_name || fullName,
        email: user.email,
      };
    }

    if (userFilterSelect) {
      updateUserFilterOptions();
    }
  } catch (error) {
    console.warn('Profile sync failed:', error.message || error);
    state.userLookup[userId] = {
      ...state.userLookup[userId],
      id: userId,
      full_name: fullName,
      email: user.email,
    };

    if (userFilterSelect) {
      updateUserFilterOptions();
    }
  }
};

const applySessionUserToLookup = () => {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) {
    return;
  }

  const sessionUser = state.session?.user;
  const currentUserName = sessionUser?.user_metadata?.full_name || sessionUser?.user_metadata?.name || (sessionUser?.email ? sessionUser.email.split('@')[0] : null);

  state.userLookup[currentUserId] = {
    ...state.userLookup[currentUserId],
    id: currentUserId,
    full_name: currentUserName || state.userLookup[currentUserId]?.full_name || 'Pengguna',
    email: sessionUser?.email || state.userLookup[currentUserId]?.email,
  };

  if (userFilterSelect) {
    updateUserFilterOptions();
  }
};

const hydrateUserLookupFromTransactions = () => {
  const transactionUsers = (state.transactions || []).map((item) => item.user_id).filter(Boolean);

  transactionUsers.forEach((userId) => {
    if (!state.userLookup[userId]) {
      state.userLookup[userId] = {
        id: userId,
        full_name: `User ${String(userId).slice(0, 8)}`,
        email: null,
      };
    }
  });

  if (userFilterSelect) {
    updateUserFilterOptions();
  }
};

const updateUserFilterOptions = () => {
  const userIds = new Set([
    ...Object.keys(state.userLookup || {}),
    ...state.transactions.map((item) => item.user_id).filter(Boolean),
  ]);

  const uniqueUserIds = [...userIds];

  userFilterSelect.innerHTML = '<option value="all">Semua user</option>' + uniqueUserIds
    .map((userId) => `<option value="${userId}">${getUserDisplayName(userId)}</option>`)
    .join('');

  if (!uniqueUserIds.includes(state.userFilter)) {
    state.userFilter = 'all';
  }

  userFilterSelect.value = state.userFilter;
};

const getFilteredTransactions = () => {
  return state.transactions.filter((item) => {
    const matchesType = state.filterType === 'all' || item.type === state.filterType;
    const matchesMonth = !state.monthFilter || item.date.startsWith(state.monthFilter);
    const matchesUser = state.userFilter === 'all' || String(item.user_id) === String(state.userFilter);
    return matchesType && matchesMonth && matchesUser;
  });
};

const getReportScopedTransactions = () => {
  let data = getFilteredTransactions();
  const filters = state.reportFilters || {};
  const { wallet, category, subcategory, tag, period, startDate, endDate } = filters;

  if (wallet && wallet !== 'all') {
    const walletKey = String(wallet).toLowerCase();
    data = data.filter((item) => {
      const walletCandidate = String(item.wallet || item.wallet_id || 'default').toLowerCase();
      return walletCandidate.includes(walletKey.replace(/-/g, ' ')) || walletCandidate.includes(walletKey);
    });
  }

  if (category && category !== 'all') {
    data = data.filter((item) => String(item.category || '').toLowerCase() === String(category).toLowerCase());
  }

  if (subcategory && subcategory !== 'all') {
    data = data.filter((item) => {
      const itemSubcategory = String(item.subcategory || item.tag || '').toLowerCase();
      return itemSubcategory === String(subcategory).toLowerCase() || String(item.category || '').toLowerCase() === String(subcategory).toLowerCase();
    });
  }

  if (String(tag || '').trim()) {
    const needle = String(tag).trim().toLowerCase();
    data = data.filter((item) => {
      const haystack = `${item.category || ''} ${item.description || ''} ${item.subcategory || ''} ${item.tag || ''}`.toLowerCase();
      return haystack.includes(needle);
    });
  }

  if (period === 'custom') {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59`) : null;
    data = data.filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`);
      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });
  } else if (period === 'daily') {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    data = data.filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`);
      return itemDate >= start && itemDate <= end;
    });
  } else if (period === 'weekly') {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);
    data = data.filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`);
      return itemDate >= start && itemDate <= end;
    });
  } else if (period === 'yearly') {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
    const end = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
    data = data.filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`);
      return itemDate >= start && itemDate <= end;
    });
  } else {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
    data = data.filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`);
      return itemDate >= start && itemDate <= end;
    });
  }

  return data;
};

const renderReportFilterSummary = () => {
  if (!reportFilterSummary) return;

  const filters = state.reportFilters || {};
  const periodLabel = {
    daily: 'Harian',
    weekly: 'Mingguan',
    monthly: 'Bulanan',
    yearly: 'Tahunan',
    custom: 'Kustom',
  }[filters.period || 'monthly'];
  const walletLabel = filters.wallet === 'all' ? 'Semua rekening' : filters.wallet;
  const categoryLabel = filters.category === 'all' ? 'Semua kategori' : filters.category;
  const subcategoryLabel = filters.subcategory === 'all' ? 'Semua sub-kategori' : filters.subcategory;
  const tagLabel = String(filters.tag || '').trim() || 'Tanpa tag';

  reportFilterSummary.textContent = `Menampilkan ${periodLabel.toLowerCase()} • ${walletLabel} • ${categoryLabel} • ${subcategoryLabel} • tag: ${tagLabel}.`;
};

const syncReportFilterControls = () => {
  if (reportWalletFilter) reportWalletFilter.value = state.reportFilters.wallet || 'all';
  if (reportCategoryFilter) reportCategoryFilter.value = state.reportFilters.category || 'all';
  if (reportSubcategoryFilter) reportSubcategoryFilter.value = state.reportFilters.subcategory || 'all';
  if (reportTagFilter) reportTagFilter.value = state.reportFilters.tag || '';
  if (reportStartDate) reportStartDate.value = state.reportFilters.startDate || '';
  if (reportEndDate) reportEndDate.value = state.reportFilters.endDate || '';
  if (reportCustomDateRange) {
    const isCustom = state.reportFilters.period === 'custom';
    reportCustomDateRange.classList.toggle('hidden', !isCustom);
  }
  document.querySelectorAll('[data-report-period]').forEach((button) => {
    const isActive = button.dataset.reportPeriod === (state.reportFilters.period || 'monthly');
    button.classList.toggle('active', isActive);
  });
  renderReportFilterSummary();
};

const populateReportFilterOptions = () => {
  const categories = [...new Set(state.transactions.map((item) => item.category).filter(Boolean))];
  const subcategories = [...new Set(state.transactions.map((item) => item.subcategory || item.tag).filter(Boolean))];

  if (reportCategoryFilter) {
    reportCategoryFilter.innerHTML = '<option value="all">Semua kategori</option>' + categories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join('');
    if (!categories.includes(state.reportFilters.category)) {
      state.reportFilters.category = 'all';
    }
    reportCategoryFilter.value = state.reportFilters.category || 'all';
  }

  if (reportSubcategoryFilter) {
    reportSubcategoryFilter.innerHTML = '<option value="all">Semua sub-kategori</option>' + subcategories
      .map((subcategory) => `<option value="${subcategory}">${subcategory}</option>`)
      .join('');
    if (!subcategories.includes(state.reportFilters.subcategory)) {
      state.reportFilters.subcategory = 'all';
    }
    reportSubcategoryFilter.value = state.reportFilters.subcategory || 'all';
  }
};

const getMonthlyTrendData = () => {
  const monthMap = new Map();

  getFilteredTransactions().forEach((item) => {
    const monthKey = item.date.slice(0, 7);
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { income: 0, expense: 0 });
    }

    const monthSummary = monthMap.get(monthKey);
    if (item.type === 'income') {
      monthSummary.income += Number(item.amount);
    } else {
      monthSummary.expense += Number(item.amount);
    }
  });

  const sortedMonthKeys = Array.from(monthMap.keys()).sort();
  const lastSixMonths = sortedMonthKeys.slice(-6);

  return lastSixMonths.map((monthKey) => {
    const monthSummary = monthMap.get(monthKey);
    return {
      month: monthKey,
      label: new Date(`${monthKey}-01T00:00:00`).toLocaleString('id-ID', { month: 'short', year: '2-digit' }),
      income: monthSummary.income,
      expense: monthSummary.expense,
    };
  });
};

const renderMonthlyChart = () => {
  const chartData = getMonthlyTrendData();
  const maxValue = Math.max(...chartData.flatMap((item) => [item.income, item.expense]), 1);

  monthlyChart.innerHTML = chartData.length
    ? chartData
        .map((item) => {
          const incomeHeight = (item.income / maxValue) * 100;
          const expenseHeight = (item.expense / maxValue) * 100;

          return `
            <div class="chart-group">
              <div class="chart-bars">
                <span class="chart-bar income" style="height: ${incomeHeight}%"></span>
                <span class="chart-bar expense" style="height: ${expenseHeight}%"></span>
              </div>
              <div class="chart-values">${formatRupiah(item.income)}<br>${formatRupiah(item.expense)}</div>
              <div class="chart-label">${item.label}</div>
            </div>
          `;
        })
        .join('')
    : '<div class="chart-empty">Belum ada data untuk chart.</div>';
};

const renderCategorySummary = () => {
  const totals = {};

  getFilteredTransactions().forEach((item) => {
    const category = item.category || 'Lainnya';
    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += Number(item.amount);
  });

  const sortedCategories = Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  categorySummaryList.innerHTML = sortedCategories.length
    ? sortedCategories
        .map(([category, total]) => `
          <li>
            <span class="category-name">${category}</span>
            <span class="category-total">${formatRupiah(total)}</span>
          </li>
        `)
        .join('')
    : '<li><span class="category-name">Belum ada data</span></li>';
};

const renderDetailedReports = () => {
  const filteredTransactions = getFilteredTransactions();

  const userTotals = {};
  filteredTransactions.forEach((item) => {
    const userId = item.user_id || 'unknown';
    if (!userTotals[userId]) {
      userTotals[userId] = { income: 0, expense: 0, total: 0 };
    }

    if (item.type === 'income') {
      userTotals[userId].income += Number(item.amount);
    } else {
      userTotals[userId].expense += Number(item.amount);
    }

    userTotals[userId].total += Number(item.amount);
  });

  const categoryTotals = {};
  filteredTransactions.forEach((item) => {
    const category = item.category || 'Lainnya';
    if (!categoryTotals[category]) {
      categoryTotals[category] = { income: 0, expense: 0, total: 0 };
    }

    if (item.type === 'income') {
      categoryTotals[category].income += Number(item.amount);
    } else {
      categoryTotals[category].expense += Number(item.amount);
    }

    categoryTotals[category].total += Number(item.amount);
  });

  const sortedUsers = Object.entries(userTotals)
    .sort(([, a], [, b]) => b.total - a.total);

  userBreakdownList.innerHTML = sortedUsers.length
    ? sortedUsers
        .map(([userId, totals]) => `
          <li>
            <div class="data-row">
              <span>${getUserDisplayName(userId)}</span>
              <strong>${formatRupiah(totals.total)}</strong>
            </div>
            <div class="mini-meta">
              <span>In: ${formatRupiah(totals.income)}</span>
              <span>Out: ${formatRupiah(totals.expense)}</span>
            </div>
          </li>
        `)
        .join('')
    : '<li><span class="category-name">Belum ada data user</span></li>';

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b.total - a.total);

  categoryBreakdownList.innerHTML = sortedCategories.length
    ? sortedCategories
        .map(([category, totals]) => `
          <li>
            <div class="data-row">
              <span>${category}</span>
              <strong>${formatRupiah(totals.total)}</strong>
            </div>
            <div class="mini-meta">
              <span>In: ${formatRupiah(totals.income)}</span>
              <span>Out: ${formatRupiah(totals.expense)}</span>
            </div>
          </li>
        `)
        .join('')
    : '<li><span class="category-name">Belum ada data kategori</span></li>';
};

const getBudgetPayload = () => ({
  wallet_id: defaultWalletId,
  user_id: getCurrentUserId(),
  month: budgetMonthInput.value,
  category: budgetCategoryInput?.value.trim() || '',
  type: budgetTypeInput?.value || 'expense',
  amount: Number(budgetAmountInput?.value || 0),
  note: budgetNoteInput?.value.trim() || '',
});

const bindBudgetRowRemoveActions = (row) => {
  const removeButton = row.querySelector('.transaction-row-remove');
  if (!removeButton || removeButton.dataset.bound === 'true') {
    return;
  }

  removeButton.dataset.bound = 'true';
  removeButton.addEventListener('click', () => {
    const remainingRows = budgetRowsContainer?.querySelectorAll('.budget-row') || [];
    if (remainingRows.length <= 1) {
      row.querySelector('.transaction-row-category').value = '';
      row.querySelector('.transaction-row-amount').value = '';
      row.querySelector('.transaction-row-note').value = '';
      row.querySelector('.transaction-row-type').value = budgetTypeInput?.value || 'expense';
      syncBudgetRowTypeState(row);
      return;
    }

    row.remove();
  });
};

const syncBudgetRowTypeState = (row) => {
  const typeInput = row.querySelector('.transaction-row-type');
  const typeButtons = row.querySelectorAll('.type-toggle-btn');
  if (!typeInput || typeButtons.length === 0) {
    return;
  }

  const selectedType = typeInput.value || 'expense';
  typeButtons.forEach((button) => {
    const isActive = button.dataset.rowType === selectedType;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const createBudgetRow = (initialValues = {}) => {
  const row = document.createElement('div');
  row.className = 'budget-row transaction-row';
  row.innerHTML = `
    <div class="transaction-row-fields">
      <div class="field-group compact-field transaction-row-category-wrap">
        <span class="field-label">Kategori</span>
        <div class="transaction-row-category-options"></div>
        <input type="text" class="transaction-row-category" placeholder="Kategori" />
      </div>

      <div class="field-group compact-field">
        <span class="field-label">Jenis</span>
        <div class="transaction-row-type-toggle" aria-label="Jenis anggaran baris">
          <button type="button" class="type-toggle-btn" data-row-type="income">Pemasukan</button>
          <button type="button" class="type-toggle-btn" data-row-type="expense">Pengeluaran</button>
          <input type="hidden" class="transaction-row-type" value="expense" />
        </div>
      </div>

      <label class="field-group compact-field">
        <span class="field-label">Nominal</span>
        <div class="currency-wrap">
          <span class="currency-symbol">Rp</span>
          <input type="text" class="transaction-row-amount" inputmode="numeric" pattern="[0-9]*" min="1" placeholder="1500000" />
        </div>
      </label>

      <label class="field-group compact-field">
        <span class="field-label">Catatan</span>
        <input type="text" class="transaction-row-note" placeholder="Opsional" />
      </label>
    </div>
    <button type="button" class="btn btn-secondary btn-small transaction-row-remove" aria-label="Hapus baris">✕</button>
  `;

  const categoryInput = row.querySelector('.transaction-row-category');
  const amountInput = row.querySelector('.transaction-row-amount');
  const noteInput = row.querySelector('.transaction-row-note');
  const typeInput = row.querySelector('.transaction-row-type');
  const categoryOptionsWrap = row.querySelector('.transaction-row-category-options');
  const typeButtons = row.querySelectorAll('.type-toggle-btn');

  categoryInput.value = initialValues.category || '';
  amountInput.value = initialValues.amount || '';
  noteInput.value = initialValues.note || '';
  typeInput.value = initialValues.type || budgetTypeInput?.value || 'expense';

  const renderBudgetCategoryOptions = () => {
    const categories = getStoredCategoryOptions();
    categoryOptionsWrap.innerHTML = categories
      .map(
        (category) => `
          <button type="button" class="chip-card ${category === categoryInput.value ? 'selected' : ''}" data-category-option="${category}">
            <span class="chip-label">${category}</span>
            <span class="chip-remove" aria-label="Hapus kategori ${category}" title="Hapus kategori">×</span>
          </button>
        `
      )
      .join('');
  };

  renderBudgetCategoryOptions();

  categoryOptionsWrap.addEventListener('click', (event) => {
    const removeTrigger = event.target.closest('.chip-remove');
    if (removeTrigger) {
      event.preventDefault();
      const chip = removeTrigger.closest('[data-category-option]');
      if (!chip) return;
      const category = chip.dataset.categoryOption;
      removeCategoryOption(category);
      if (categoryInput.value === category) {
        categoryInput.value = '';
      }
      renderBudgetCategoryOptions();
      return;
    }

    const button = event.target.closest('[data-category-option]');
    if (!button) return;
    categoryInput.value = button.dataset.categoryOption;
    renderBudgetCategoryOptions();
  });

  categoryInput.addEventListener('change', () => {
    if (categoryInput.value.trim()) {
      upsertCustomCategory(categoryInput.value);
    }
    renderBudgetCategoryOptions();
  });

  categoryInput.addEventListener('blur', () => {
    if (categoryInput.value.trim()) {
      upsertCustomCategory(categoryInput.value);
    }
    renderBudgetCategoryOptions();
  });

  typeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      typeInput.value = button.dataset.rowType;
      syncBudgetRowTypeState(row);
    });
  });

  syncBudgetRowTypeState(row);
  bindBudgetRowRemoveActions(row);

  return row;
};

const getBudgetPayloads = () => {
  if (!budgetRowsContainer) {
    return [];
  }

  const month = budgetMonthInput?.value || '';
  const rows = [...budgetRowsContainer.querySelectorAll('.budget-row')];

  return rows
    .map((row) => {
      const category = row.querySelector('.transaction-row-category')?.value.trim() || '';
      const type = row.querySelector('.transaction-row-type')?.value || 'expense';
      const amount = normalizeAmount(row.querySelector('.transaction-row-amount')?.value || '');
      const note = row.querySelector('.transaction-row-note')?.value.trim() || '';

      if (!month || !category || amount < 1) {
        return null;
      }

      return {
        wallet_id: defaultWalletId,
        user_id: getCurrentUserId(),
        month,
        category,
        type,
        amount,
        note,
      };
    })
    .filter(Boolean);
};

const getBudgetMatchingTransactions = (month, category, type) => {
  return state.transactions
    .filter((item) => item.date.startsWith(month) && item.category === category && item.type === type)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getMonthlyActualBudget = (month, category, type) => {
  return getBudgetMatchingTransactions(month, category, type).reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

const renderBudgetPlans = () => {
  if (!budgetPlanList) {
    return;
  }

  const sourcePlans = state.budgetPlans.length ? state.budgetPlans : demoBudgetPlans;

  budgetPlanList.innerHTML = sourcePlans.length
    ? sourcePlans
        .slice()
        .sort((a, b) => String(b.month || '').localeCompare(String(a.month || '')))
        .map((plan) => {
          const target = Number(plan.amount || 0);
          const matchingTransactions = getBudgetMatchingTransactions(plan.month, plan.category, plan.type);
          const actual = matchingTransactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
          const percentage = target > 0 ? Math.min((actual / target) * 100, 100) : 0;
          const status = actual > target ? 'Melebihi' : actual >= target * 0.8 ? 'Hati-hati' : 'Aman';
          const statusClass = actual > target ? 'bad' : actual >= target * 0.8 ? 'warn' : 'ok';
          const relatedTransactionsMarkup = matchingTransactions.length
            ? matchingTransactions
                .slice(0, 4)
                .map(
                  (item) => `
                    <div class="budget-transaction-item">
                      <span>${item.date}</span>
                      <strong>${item.description}</strong>
                      <em>${formatRupiah(item.amount)}</em>
                    </div>
                  `
                )
                .join('')
            : '<div class="budget-transaction-empty">Belum ada transaksi yang cocok.</div>';

          return `
            <div class="budget-card">
              <div class="budget-head">
                <div>
                  <strong>${plan.category}</strong>
                  <small>${plan.month} • ${plan.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</small>
                </div>
                <button type="button" class="mini-btn delete-btn" data-budget-delete="${plan.id}" title="Hapus anggaran" aria-label="Hapus anggaran">🗑</button>
              </div>

              <div class="budget-amount-row">
                <span>Target</span>
                <strong>${formatRupiah(target)}</strong>
              </div>

              <div class="budget-progress">
                <div class="budget-progress-bar" style="width: ${Math.max(percentage, 8)}%"></div>
              </div>

              <div class="budget-meta">
                <span>Realisasi: ${formatRupiah(actual)}</span>
                <span class="budget-status ${statusClass}">${status}</span>
              </div>

              <div class="budget-transaction-list">
                <div class="budget-transaction-label">Transaksi terkait</div>
                ${relatedTransactionsMarkup}
              </div>

              ${plan.note ? `<small>${plan.note}</small>` : ''}
            </div>
          `;
        })
        .join('')
    : '<p class="empty-state">Belum ada anggaran bulanan.</p>';

  renderBudgetAlertReportView();
};

const loadBudgetsFromSupabase = async () => {
  if (!fintrackSupabase || !isSupabaseConfigured()) {
    state.budgetPlans = [...demoBudgetPlans];
    renderBudgetPlans();
    return;
  }

  try {
    const { data, error } = await fintrackSupabase
      .from('budgets')
      .select('*')
      .eq('wallet_id', defaultWalletId)
      .order('month', { ascending: false });
    if (error) throw error;

    state.budgetPlans = data && data.length ? data : [];
    renderBudgetPlans();
  } catch (error) {
    console.warn('Budget load failed:', error.message || error);
    state.budgetPlans = [...demoBudgetPlans];
    renderBudgetPlans();
  }
};

const handleBudgetSubmit = async (event) => {
  event.preventDefault();

  const userId = getCurrentUserId();
  if (!userId) {
    showToast('Silakan login dulu sebelum menambah anggaran.');
    return;
  }

  const payloads = getBudgetPayloads();
  if (!payloads.length) {
    showToast('Bulan, kategori, dan nominal anggaran wajib diisi minimal satu baris.');
    return;
  }

  if (!fintrackSupabase || !isSupabaseConfigured()) {
    const newPlans = payloads.map((payload, index) => ({
      id: `budget-${Date.now()}-${index}`,
      ...payload,
    }));

    state.budgetPlans.unshift(...newPlans);
    localStorage.setItem('fintrackBudgetPlans', JSON.stringify(state.budgetPlans));
    renderBudgetPlans();
    budgetForm.reset();
    budgetTypeInput.value = 'expense';
    syncBudgetTypeButtons();
    renderBudgetCategoryButtons();
    syncBudgetCategoryButtons();
    if (budgetRowsContainer) {
      budgetRowsContainer.innerHTML = '';
      budgetRowsContainer.appendChild(createBudgetRow({ type: 'expense' }));
    }
    showToast(`${newPlans.length} anggaran demo berhasil disimpan.`);
    return;
  }

  try {
    const { data, error } = await fintrackSupabase.from('budgets').insert(payloads).select();
    if (error) throw error;

    const savedPlans = data && data.length ? data : payloads.map((payload, index) => ({ ...payload, id: `budget-${Date.now()}-${index}` }));
    state.budgetPlans = [...savedPlans, ...state.budgetPlans];
    renderBudgetPlans();
    budgetForm.reset();
    budgetTypeInput.value = 'expense';
    syncBudgetTypeButtons();
    renderBudgetCategoryButtons();
    syncBudgetCategoryButtons();
    if (budgetRowsContainer) {
      budgetRowsContainer.innerHTML = '';
      budgetRowsContainer.appendChild(createBudgetRow({ type: 'expense' }));
    }
    showToast(`${savedPlans.length} anggaran berhasil disimpan ke Supabase.`);
  } catch (error) {
    showToast(error.message || 'Gagal menyimpan anggaran.');
  }
};

const handleDeleteBudget = async (budgetId) => {
  const target = state.budgetPlans.find((item) => String(item.id) === String(budgetId));
  if (!target) {
    return;
  }

  if (!fintrackSupabase || !isSupabaseConfigured()) {
    state.budgetPlans = state.budgetPlans.filter((item) => String(item.id) !== String(budgetId));
    localStorage.setItem('fintrackBudgetPlans', JSON.stringify(state.budgetPlans));
    renderBudgetPlans();
    showToast('Anggaran berhasil dihapus.');
    return;
  }

  try {
    const { error } = await fintrackSupabase
      .from('budgets')
      .delete()
      .eq('id', budgetId)
      .eq('user_id', getCurrentUserId());

    if (error) throw error;

    state.budgetPlans = state.budgetPlans.filter((item) => String(item.id) !== String(budgetId));
    renderBudgetPlans();
    showToast('Anggaran berhasil dihapus dari Supabase.');
  } catch (error) {
    showToast(error.message || 'Gagal menghapus anggaran.');
  }
};

const renderProfile = () => {
  const savedProfile = JSON.parse(localStorage.getItem('fintrackProfile') || '{}');
  const sessionName = state.session?.user?.user_metadata?.full_name || savedProfile.name || 'Pengguna';
  const sessionEmail = state.session?.user?.email || savedProfile.email || 'belum@terdaftar';
  const target = savedProfile.target || 0;

  profileNameInput.value = sessionName;
  profileEmailInput.value = sessionEmail;
  profileTargetInput.value = String(target);
};

const syncProfileToSupabase = async (nextProfile) => {
  if (!fintrackSupabase || !isSupabaseConfigured() || !getCurrentUserId()) {
    return;
  }

  try {
    const { error } = await fintrackSupabase
      .from('profiles')
      .upsert(
        {
          id: getCurrentUserId(),
          full_name: nextProfile.name,
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) throw error;
  } catch (error) {
    console.warn('Profile sync failed:', error.message || error);
  }
};

const handleSaveProfile = async () => {
  const nextProfile = {
    name: profileNameInput.value.trim() || 'Pengguna',
    email: profileEmailInput.value.trim() || 'belum@terdaftar',
    target: Number(profileTargetInput.value) || 0,
  };

  localStorage.setItem('fintrackProfile', JSON.stringify(nextProfile));
  await syncProfileToSupabase(nextProfile);
  showToast('Profil berhasil disimpan.');
  renderProfile();
};

const exportTransactionsCsv = () => {
  const visibleTransactions = getFilteredTransactions();
  const headers = ['date', 'category', 'description', 'user', 'type', 'amount'];
  const rows = visibleTransactions.map((item) => [
    item.date,
    item.category,
    item.description,
    getUserDisplayName(item.user_id),
    item.type,
    item.amount,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fintrack-transactions.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast('Data CSV berhasil diekspor.');
};

const renderOverviewTransactionList = () => {
  if (!overviewTransactionList) {
    return;
  }

  const visibleTransactions = getFilteredTransactions()
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  overviewTransactionList.innerHTML = visibleTransactions.length
    ? visibleTransactions
        .map((item) => {
          const sign = item.type === 'income' ? '+' : '-';
          const typeClass = item.type === 'income' ? 'income' : 'expense';

          return `
            <li class="overview-transaction-item">
              <div class="overview-transaction-main">
                <span class="overview-transaction-category">${item.category}</span>
                <span class="overview-transaction-description">${item.description}</span>
              </div>
              <div class="overview-transaction-meta">
                <span class="type-badge ${typeClass}">${item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span>
                <strong class="overview-transaction-amount ${typeClass}">${sign} ${formatRupiah(item.amount)}</strong>
              </div>
            </li>
          `;
        })
        .join('')
    : '<li class="overview-empty">Belum ada transaksi dengan filter tersebut.</li>';
};

const renderDonutChart = (container, items, labelText, maxColorCount = 8) => {
  if (!container) {
    return;
  }

  const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const palette = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#f97316', '#22d3ee', '#f87171'];

  if (!total || !items.length) {
    container.innerHTML = '<div class="empty-donut"><span>Belum ada data</span></div>';
    return;
  }

  let currentAngle = 0;
  const gradientParts = items
    .map((item, index) => {
      const ratio = (Number(item.value || 0) / total) * 100;
      const start = currentAngle;
      currentAngle += ratio;
      const color = palette[index % maxColorCount];
      return `${color} ${start}% ${currentAngle}%`;
    })
    .join(', ');

  const legendMarkup = items
    .map((item, index) => {
      const percentage = total ? ((Number(item.value || 0) / total) * 100).toFixed(1) : '0.0';
      return `
        <li>
          <span class="legend-swatch" style="background: ${palette[index % maxColorCount]};"></span>
          <span class="legend-name">${item.label}</span>
          <strong>${percentage}%</strong>
        </li>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="donut-row">
      <div class="donut-chart" style="background: conic-gradient(${gradientParts});">
        <div class="donut-center">
          <strong>${formatRupiah(total)}</strong>
          <span>${labelText}</span>
        </div>
      </div>
      <ul class="donut-legend">${legendMarkup}</ul>
    </div>
  `;
};

const getMonthlyComparisonData = () => {
  const monthMap = new Map();

  getFilteredTransactions().forEach((item) => {
    const monthKey = item.date.slice(0, 7);
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { income: 0, expense: 0 });
    }

    const monthSummary = monthMap.get(monthKey);
    if (item.type === 'income') {
      monthSummary.income += Number(item.amount || 0);
    } else {
      monthSummary.expense += Number(item.amount || 0);
    }
  });

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => String(a).localeCompare(String(b)))
    .slice(-6)
    .map(([monthKey, values]) => ({
      month: monthKey,
      label: new Date(`${monthKey}-01T00:00:00`).toLocaleString('id-ID', { month: 'short', year: '2-digit' }),
      income: values.income,
      expense: values.expense,
    }));
};

const getDailyExpenseData = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const dailyMap = new Map();

  getFilteredTransactions()
    .filter((item) => item.type === 'expense' && item.date.startsWith(currentMonth))
    .forEach((item) => {
      const day = new Date(`${item.date}T00:00:00`).getDate();
      const value = Number(item.amount || 0);
      dailyMap.set(day, (dailyMap.get(day) || 0) + value);
    });

  const maxDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= maxDay; day += 1) {
    const amount = dailyMap.get(day) || 0;
    days.push({ day, amount });
  }

  return days;
};

const renderComparisonChart = () => {
  if (!monthlyComparisonChart) return;

  const data = getMonthlyComparisonData();

  if (!data.length) {
    monthlyComparisonChart.innerHTML = '<div class="empty-state">Belum ada data bulan ini.</div>';
    return;
  }

  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expense]), 1);

  monthlyComparisonChart.innerHTML = `
    <div class="chart-legend">
      <span><i class="legend-dot income"></i>Pemasukan</span>
      <span><i class="legend-dot expense"></i>Pengeluaran</span>
    </div>
    <div class="bar-chart-grid">
      ${data
        .map(
          (item) => `
            <div class="bar-item">
              <div class="bar-stack">
                <span class="bar income" style="height: ${(item.income / maxValue) * 100}%"></span>
                <span class="bar expense" style="height: ${(item.expense / maxValue) * 100}%"></span>
              </div>
              <small>${item.label}</small>
            </div>
          `
        )
        .join('')}
    </div>
  `;
};

const renderDailyExpenseChart = () => {
  if (!dailyExpenseChart) return;

  const data = getDailyExpenseData();

  if (!data.length || data.every((item) => item.amount === 0)) {
    dailyExpenseChart.innerHTML = '<div class="empty-state">Belum ada pengeluaran harian.</div>';
    return;
  }

  const maxValue = Math.max(...data.map((item) => item.amount), 1);
  const visibleDays = data.filter((item) => item.amount > 0);

  dailyExpenseChart.innerHTML = `
    <div class="daily-chart-grid">
      ${visibleDays
        .map(
          (item) => `
            <div class="daily-column">
              <span class="daily-bar" style="height: ${(item.amount / maxValue) * 100}%"></span>
              <small>${item.day}</small>
            </div>
          `
        )
        .join('')}
    </div>
  `;
};

const renderReportOverviewView = () => {
  if (!reportOverviewTotalBalance || !reportWalletBreakdown || !reportIncomeValue || !reportExpenseValue || !reportNetValue || !reportSavingsRateValue || !reportOverviewHealthBadge || !reportFinancialHealthText) {
    return;
  }

  const scopedTransactions = getReportScopedTransactions();
  const income = scopedTransactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + Number(item.amount || 0), 0);
  const expense = scopedTransactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + Number(item.amount || 0), 0);
  const net = income - expense;
  const savingsRate = income > 0 ? (net / income) * 100 : 0;
  const walletBreakdown = getWalletBalanceBreakdown();
  const totalBalance = walletBreakdown.reduce((sum, wallet) => sum + wallet.value, 0);

  reportOverviewTotalBalance.textContent = formatRupiah(totalBalance);
  reportWalletBreakdown.innerHTML = walletBreakdown
    .map(
      (wallet) => `
        <div class="wallet-card">
          <span class="wallet-card-title">${wallet.name}</span>
          <strong>${formatRupiah(wallet.value)}</strong>
          <small>Saldo aktif</small>
        </div>
      `
    )
    .join('');

  reportIncomeValue.textContent = `+${formatRupiah(income)}`;
  reportExpenseValue.textContent = `-${formatRupiah(expense)}`;
  reportNetValue.textContent = formatRupiah(net);
  reportSavingsRateValue.textContent = `${Math.max(0, savingsRate).toFixed(1)}%`;

  let healthStatus = 'Sehat';
  let healthClass = 'health-good';
  let healthMessage = 'Sehat - Pengeluaran di bawah 70% pemasukan.';

  if (expense > 0 && income > 0 && expense / income > 0.7) {
    healthStatus = 'Waspada';
    healthClass = 'health-warning';
    healthMessage = 'Waspada - Pengeluaran sudah mendekati atau melebihi 70% dari pemasukan.';
  }

  if (expense > 0 && income > 0 && expense / income >= 0.9) {
    healthStatus = 'Berisiko';
    healthClass = 'health-danger';
    healthMessage = 'Berisiko - Pengeluaran berada di atas 90% pemasukan, kebutuhan penyesuaian anggaran segera.';
  }

  reportOverviewHealthBadge.textContent = healthStatus;
  reportOverviewHealthBadge.className = `health-badge ${healthClass}`;
  reportFinancialHealthText.textContent = healthMessage;
};

const renderVisualReportView = () => {
  const scopedTransactions = getReportScopedTransactions();
  const expenses = {};
  const incomes = {};

  scopedTransactions.forEach((item) => {
    if (item.type === 'expense') {
      const category = item.category || 'Lainnya';
      expenses[category] = (expenses[category] || 0) + Number(item.amount || 0);
    }

    if (item.type === 'income') {
      const category = item.category || 'Lainnya';
      incomes[category] = (incomes[category] || 0) + Number(item.amount || 0);
    }
  });

  renderDonutChart(
    expenseDonutChart,
    Object.entries(expenses)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5),
    'Pengeluaran'
  );

  renderDonutChart(
    incomeDonutChart,
    Object.entries(incomes)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5),
    'Pemasukan'
  );

  renderComparisonChart();
  renderDailyExpenseChart();
};

const renderBudgetAlertReportView = () => {
  if (!reportBudgetList) {
    return;
  }

  const currentMonth = new Date().toISOString().slice(0, 7);
  const sourcePlans = state.budgetPlans.length ? state.budgetPlans : demoBudgetPlans;
  const budgetAlerts = sourcePlans
    .filter((plan) => plan.type === 'expense' && String(plan.month || '').startsWith(currentMonth.slice(0, 4)))
    .map((plan) => {
      const target = Number(plan.amount || 0);
      const actual = state.transactions
        .filter((item) => item.date && item.date.startsWith(plan.month) && item.category === plan.category && item.type === 'expense')
        .reduce((sum, item) => sum + Number(item.amount || 0), 0);
      const percentage = target > 0 ? Math.min((actual / target) * 100, 100) : 0;
      const remaining = target - actual;
      let status = 'Aman';
      let tone = 'safe';

      if (percentage >= 75 && percentage < 90) {
        status = 'Hati-hati';
        tone = 'warning';
      } else if (percentage >= 90 || actual > target) {
        status = actual > target ? 'Melebihi' : 'Bahaya';
        tone = 'danger';
      }

      return {
        plan,
        target,
        actual,
        remaining,
        percentage,
        status,
        tone,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  if (!budgetAlerts.length) {
    reportBudgetList.innerHTML = '<div class="empty-state">Belum ada anggaran pengeluaran aktif untuk bulan ini.</div>';
    return;
  }

  reportBudgetList.innerHTML = budgetAlerts
    .map(({ plan, target, actual, remaining, percentage, status, tone }) => {
      const barWidth = Math.min(percentage, 100);
      const remainingText = remaining >= 0 ? `Sisa: ${formatRupiah(remaining)}` : `Over: ${formatRupiah(Math.abs(remaining))}`;

      return `
        <div class="budget-alert-card ${tone}">
          <div class="budget-alert-head">
            <div>
              <strong>${plan.category}</strong>
              <small>${plan.month}</small>
            </div>
            <span class="status-pill ${tone}">${status}</span>
          </div>

          <div class="budget-alert-amounts">
            <span>Budget ${formatRupiah(target)}</span>
            <span>Terpakai ${formatRupiah(actual)}</span>
          </div>

          <div class="budget-alert-progress">
            <div class="budget-alert-progress-bar ${tone}" style="width: ${barWidth}%"></div>
          </div>

          <div class="budget-alert-meta">
            <span>${percentage.toFixed(0)}%</span>
            <span>${remainingText}</span>
          </div>
        </div>
      `;
    })
    .join('');
};

const getWalletLabel = (walletId) => {
  if (!walletId || String(walletId) === String(defaultWalletId)) {
    return 'Dompet Utama';
  }

  return 'Dompet Utama';
};

const getWalletBalanceBreakdown = () => {
  const totalIncome = getFilteredTransactions()
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalExpense = getFilteredTransactions()
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalBalance = Math.max(0, totalIncome - totalExpense);

  return [{ name: 'Dompet Utama', value: totalBalance }];
};

const getSortedTransactionRows = (rows, sortValue) => {
  const sorted = [...rows];

  switch (sortValue) {
    case 'date-asc':
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'amount-desc':
      sorted.sort((a, b) => Number(b.amount) - Number(a.amount));
      break;
    case 'amount-asc':
      sorted.sort((a, b) => Number(a.amount) - Number(b.amount));
      break;
    case 'date-desc':
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  return sorted;
};

const renderReportDetailTable = (rows, tableBody) => {
  if (!tableBody) return;

  if (!rows.length) {
    tableBody.innerHTML = '<tr><td colspan="6">Belum ada transaksi yang sesuai.</td></tr>';
    return;
  }

  tableBody.innerHTML = rows
    .map((item) => `
      <tr>
        <td data-label="Tanggal">${item.date}</td>
        <td data-label="Kategori">${item.category || 'Lainnya'}</td>
        <td data-label="Keterangan">${item.description || '-'}</td>
        <td data-label="Jenis"><span class="type-badge ${item.type === 'income' ? 'income' : 'expense'}">${item.type === 'income' ? 'Masuk' : 'Keluar'}</span></td>
        <td data-label="Jumlah" class="amount-cell ${item.type === 'income' ? 'income' : 'expense'}">${item.type === 'income' ? '+' : '-'} ${formatRupiah(item.amount)}</td>
        <td data-label="Dompet">${getWalletLabel(item.wallet_id || item.wallet || defaultWalletId)}</td>
      </tr>
    `)
    .join('');
};

const renderReportDetailView = () => {
  const data = getFilteredTransactions().slice();
  const searchValue = (reportDetailSearch?.value || reportDetailSearchFull?.value || '').trim().toLowerCase();
  const sortValue = reportDetailSort?.value || reportDetailSortFull?.value || 'date-desc';

  const filtered = data.filter((item) => {
    if (!searchValue) return true;
    const haystack = `${item.date} ${item.category || ''} ${item.description || ''} ${item.type || ''} ${getWalletLabel(item.wallet_id || item.wallet || defaultWalletId)}`.toLowerCase();
    return haystack.includes(searchValue);
  });

  const sorted = getSortedTransactionRows(filtered, sortValue);
  renderReportDetailTable(sorted, reportDetailTableBody);
  renderReportDetailTable(sorted, reportDetailTableBodyFull);
};

const exportReportPdf = () => {
  const rows = getSortedTransactionRows(
    getFilteredTransactions().filter((item) => {
      const keyword = (reportDetailSearch?.value || reportDetailSearchFull?.value || '').trim().toLowerCase();
      if (!keyword) return true;
      const text = `${item.date} ${item.category || ''} ${item.description || ''} ${item.type || ''} ${getWalletLabel(item.wallet_id || item.wallet || defaultWalletId)}`.toLowerCase();
      return text.includes(keyword);
    }),
    reportDetailSort?.value || reportDetailSortFull?.value || 'date-desc'
  );

  const html = `
    <html>
      <head>
        <title>FinTrack - Laporan Transaksi</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 32px; color: #111827; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; font-size: 12px; }
          th { background: #f3f4f6; }
          h1 { font-size: 22px; margin-bottom: 8px; }
          .meta { color: #4b5563; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>FinTrack - Laporan Transaksi</h1>
        <div class="meta">Total data: ${rows.length}</div>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Jenis</th>
              <th>Jumlah</th>
              <th>Dompet</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (item) => `
                  <tr>
                    <td>${item.date}</td>
                    <td>${item.category || 'Lainnya'}</td>
                    <td>${item.description || '-'}</td>
                    <td>${item.type === 'income' ? 'Masuk' : 'Keluar'}</td>
                    <td>${item.type === 'income' ? '+' : '-'} ${formatRupiah(item.amount)}</td>
                    <td>${getWalletLabel(item.wallet_id || item.wallet || defaultWalletId)}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=980,height=700');
  if (!printWindow) {
    showToast('Browser memblokir popup. Izinkan popup untuk ekspor PDF.');
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  showToast('PDF sedang dipersiapkan untuk dicetak.');
};

const exportReportCsv = () => {
  const rows = getSortedTransactionRows(
    getFilteredTransactions().filter((item) => {
      const keyword = (reportDetailSearch?.value || reportDetailSearchFull?.value || '').trim().toLowerCase();
      if (!keyword) return true;
      const text = `${item.date} ${item.category || ''} ${item.description || ''} ${item.type || ''} ${getWalletLabel(item.wallet_id || item.wallet || defaultWalletId)}`.toLowerCase();
      return text.includes(keyword);
    }),
    reportDetailSort?.value || reportDetailSortFull?.value || 'date-desc'
  );

  const headers = ['Tanggal', 'Kategori', 'Keterangan', 'Jenis', 'Jumlah', 'Dompet'];
  const csvRows = rows.map((item) => [
    item.date,
    item.category || 'Lainnya',
    item.description || '-',
    item.type === 'income' ? 'Masuk' : 'Keluar',
    item.amount,
    getWalletLabel(item.wallet_id || item.wallet || defaultWalletId),
  ]);

  const csv = [headers, ...csvRows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fintrack-laporan-transaksi.csv';
  link.click();
  URL.revokeObjectURL(url);
  showToast('CSV berhasil diekspor.');
};

const renderTransactions = () => {
  const visibleTransactions = getFilteredTransactions();
  const tableRows = visibleTransactions.length
    ? visibleTransactions
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item) => {
          const typeClass = item.type === 'income' ? 'income' : 'expense';
          const sign = item.type === 'income' ? '+' : '-';

          return `
            <tr>
              <td data-label="Tanggal">${item.date}</td>
              <td data-label="Kategori">${item.category}</td>
              <td data-label="Deskripsi">${item.description}</td>
              <td data-label="User">${getUserDisplayName(item.user_id)}</td>
              <td data-label="Jenis"><span class="type-badge ${typeClass}">${item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span></td>
              <td data-label="Nominal">${sign} ${formatRupiah(item.amount)}</td>
              <td data-label="Aksi" class="table-actions">
                <button type="button" class="mini-btn edit-btn" data-action="edit" data-id="${item.id}" title="Edit transaksi" aria-label="Edit transaksi">✎</button>
                <button type="button" class="mini-btn delete-btn" data-action="delete" data-id="${item.id}" title="Hapus transaksi" aria-label="Hapus transaksi">🗑</button>
              </td>
            </tr>
          `;
        })
        .join('')
    : '<tr><td colspan="7">Belum ada transaksi dengan filter tersebut.</td></tr>';

  transactionTableBody.innerHTML = tableRows;
  applyTransactionsMobileLayout();

  const income = visibleTransactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = visibleTransactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = income - expense;

  balanceValue.textContent = formatRupiah(balance);
  incomeValue.textContent = formatRupiah(income);
  expenseValue.textContent = formatRupiah(expense);
  transactionCount.textContent = String(visibleTransactions.length);

  summaryIncome.textContent = formatRupiah(income);
  summaryExpense.textContent = formatRupiah(expense);
  summaryBalance.textContent = formatRupiah(balance);
  summaryVisibleCount.textContent = String(visibleTransactions.length);

  renderOverviewTransactionList();
  renderMonthlyChart();
  renderCategorySummary();
  renderDetailedReports();
  populateReportFilterOptions();
  syncReportFilterControls();
  renderReportOverviewView();
  renderBudgetAlertReportView();
  renderReportDetailView();
};

const showDashboard = () => {
  authSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
};

const showAuth = () => {
  authSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
};

const updateStatusBadge = () => {
  if (!fintrackSupabase || !isSupabaseConfigured()) {
    statusBadge.textContent = 'Demo mode';
    statusBadge.className = 'status-badge demo';
    return;
  }

  statusBadge.textContent = 'Supabase connected';
  statusBadge.className = 'status-badge connected';
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('Email dan password harus diisi.');
    return;
  }

  if (!fintrackSupabase) {
    showToast('Hubungkan Supabase dulu di file script.js agar login bisa aktif.');
    return;
  }

  try {
    const { data, error } = await fintrackSupabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    state.session = data.session;
    await syncCurrentProfileName();
    applySessionUserToLookup();
    await refreshSupabaseData();
    renderProfile();
    showDashboard();
    showToast('Login berhasil.');
    logoutBtn.classList.remove('hidden');
  } catch (error) {
    showToast(error.message || 'Login gagal.');
  }
};

const handleRegister = async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;

  if (!fullName || !email || !password) {
    showToast('Semua field harus diisi.');
    return;
  }

  if (!fintrackSupabase) {
    showToast('Supabase belum dikonfigurasi. Harap isi URL dan anon key terlebih dahulu.');
    return;
  }

  try {
    const { data, error } = await fintrackSupabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) throw error;

    showToast('Akun berhasil dibuat, silakan cek email Anda.');
    setAuthMode('login');
    loginForm.reset();
    registerForm.reset();
  } catch (error) {
    showToast(error.message || 'Pendaftaran gagal.');
  }
};

const handleLogout = async () => {
  if (accountMenu) {
    accountMenu.classList.add('hidden');
  }

  if (!fintrackSupabase) {
    showToast('Demo mode: Anda sedang melihat data contoh.');
    return;
  }

  try {
    const { error } = await fintrackSupabase.auth.signOut();
    if (error) throw error;

    state.session = null;
    state.transactions = [];
    state.userLookup = {};
    logoutBtn.classList.add('hidden');
    renderProfile();
    renderTransactions();
    showAuth();
    setAuthMode('login');
    showToast('Logout berhasil.');
  } catch (error) {
    showToast(error.message || 'Logout gagal.');
  }
};

const toggleAccountMenu = (shouldOpen) => {
  if (!accountMenu) return;
  const isOpen = !accountMenu.classList.contains('hidden');
  const nextState = typeof shouldOpen === 'boolean' ? shouldOpen : !isOpen;
  accountMenu.classList.toggle('hidden', !nextState);
};

const toggleSummaryFeatureMenu = (shouldOpen) => {
  if (!summaryFeatureMenu) return;
  const isOpen = !summaryFeatureMenu.classList.contains('hidden');
  const nextState = typeof shouldOpen === 'boolean' ? shouldOpen : !isOpen;
  summaryFeatureMenu.classList.toggle('hidden', !nextState);
};

const refreshSupabaseData = async () => {
  if (!fintrackSupabase || !isSupabaseConfigured() || !getCurrentUserId()) {
    return;
  }

  await Promise.all([
    loadWalletsFromSupabase(),
    loadTransactionsFromSupabase(),
    loadBudgetsFromSupabase(),
  ]);
};

const loadWalletsFromSupabase = async () => {
  if (!fintrackSupabase || !isSupabaseConfigured()) {
    state.wallets = [{ id: defaultWalletId, name: 'Dompet Utama' }];
    return;
  }

  try {
    const { data, error } = await fintrackSupabase
      .from('wallets')
      .select('*')
      .eq('id', defaultWalletId)
      .maybeSingle();

    if (error) throw error;
    state.wallets = [{ id: defaultWalletId, name: data?.name || 'Dompet Utama' }];
  } catch (error) {
    console.warn('Wallet load failed:', error.message || error);
    state.wallets = [{ id: defaultWalletId, name: 'Dompet Utama' }];
  }
};

const loadTransactionsFromSupabase = async () => {
  if (!fintrackSupabase || !isSupabaseConfigured() || !getCurrentUserId()) {
    state.transactions = [...demoTransactions];
    state.userLookup = {};
    hydrateUserLookupFromTransactions();
    updateUserFilterOptions();
    renderTransactions();
    return;
  }

  try {
    const [{ data: transactionsData, error: transactionsError }, { data: profilesData, error: profilesError }] = await Promise.all([
      fintrackSupabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', defaultWalletId)
        .order('date', { ascending: false }),
      fintrackSupabase.from('profiles').select('id, full_name').eq('id', getCurrentUserId()),
    ]);

    if (transactionsError) throw transactionsError;
    if (profilesError) throw profilesError;

    state.transactions = transactionsData && transactionsData.length ? transactionsData : [];
    state.userLookup = {};
    (profilesData || []).forEach((profile) => {
      if (profile.id) {
        state.userLookup[profile.id] = profile;
      }
    });
    hydrateUserLookupFromTransactions();
    applySessionUserToLookup();
    updateUserFilterOptions();
    renderTransactions();
  } catch (error) {
    console.warn('Supabase query failed, using demo data instead:', error.message);
    state.transactions = [...demoTransactions];
    state.userLookup = {};
    updateUserFilterOptions();
    renderTransactions();
    showToast('Menggunakan data demo karena koneksi Supabase belum siap.');
  }
};

const handleEditTransaction = (transactionId) => {
  const target = state.transactions.find((item) => String(item.id) === String(transactionId));
  if (!target) return;

  state.editingTransactionId = transactionId;
  transactionFormTitle.textContent = 'Edit Transaksi';
  submitTransactionButton.textContent = 'Update transaksi';
  cancelEditButton.classList.remove('hidden');

  upsertCustomCategory(target.category);
  document.getElementById('transactionDate').value = target.date;
  document.getElementById('transactionCategory').value = target.category;
  document.getElementById('transactionDescription').value = target.description;
  document.getElementById('transactionType').value = target.type;
  document.getElementById('transactionAmount').value = String(target.amount);
  syncCategoryButtons();
};

const handleDeleteTransaction = async (transactionId) => {
  const target = state.transactions.find((item) => String(item.id) === String(transactionId));
  if (!target) return;

  const confirmed = window.confirm(`Hapus transaksi "${target.description}"?`);
  if (!confirmed) return;

  if (!fintrackSupabase) {
    state.transactions = state.transactions.filter((item) => String(item.id) !== String(transactionId));
    renderTransactions();
    showToast('Transaksi berhasil dihapus dari mode demo.');
    return;
  }

  const userId = getCurrentUserId();
  if (!userId) {
    showToast('Silakan masuk dulu sebelum menghapus transaksi.');
    return;
  }

  try {
    const { error } = await fintrackSupabase.from('transactions').delete().eq('id', transactionId).eq('user_id', userId);
    if (error) throw error;

    state.transactions = state.transactions.filter((item) => String(item.id) !== String(transactionId));
    renderTransactions();
    if (state.editingTransactionId === transactionId) {
      resetTransactionForm();
    }
    showToast('Transaksi berhasil dihapus.');
  } catch (error) {
    showToast(error.message || 'Gagal menghapus transaksi.');
  }
};

const handleAddTransaction = async (event) => {
  event.preventDefault();

  const userId = getCurrentUserId();
  if (!userId) {
    showToast('Silakan masuk dulu sebelum menambah transaksi.');
    return;
  }

  const payload = getTransactionPayload();
  upsertCustomCategory(payload.category);

  if (!payload.date || !payload.category || !payload.description || !payload.amount || payload.amount < 1) {
    showToast('Semua field transaksi harus diisi dengan nominal yang valid.');
    return;
  }

  if (state.editingTransactionId) {
    if (!fintrackSupabase) {
      state.transactions = state.transactions.map((item) =>
        String(item.id) === String(state.editingTransactionId)
          ? { ...item, ...payload, id: item.id }
          : item
      );
      renderTransactions();
      resetTransactionForm();
      showToast('Transaksi berhasil diperbarui.');
      return;
    }

    try {
      const { data, error } = await fintrackSupabase
        .from('transactions')
        .update({
          date: payload.date,
          category: payload.category,
          description: payload.description,
          type: payload.type,
          amount: payload.amount,
        })
        .eq('id', state.editingTransactionId)
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      state.transactions = state.transactions.map((item) =>
        String(item.id) === String(state.editingTransactionId)
          ? { ...item, ...data[0] }
          : item
      );
      renderTransactions();
      resetTransactionForm();
      showToast('Transaksi berhasil diperbarui.');
      return;
    } catch (error) {
      showToast(error.message || 'Gagal memperbarui transaksi.');
      return;
    }
  }

  const bulkPayloads = getBulkTransactionPayloads();
  if (!bulkPayloads.length) {
    showToast('Isi minimal satu baris transaksi dengan tanggal, kategori, keterangan, jenis, dan nominal yang valid.');
    return;
  }

  if (!fintrackSupabase) {
    const newItems = bulkPayloads.map((item, index) => ({
      id: Date.now() + index,
      ...item,
    }));

    state.transactions.unshift(...newItems);
    renderTransactions();
    resetTransactionForm();
    showToast(`${newItems.length} transaksi berhasil ditambahkan ke mode demo.`);
    return;
  }

  try {
    const { data, error } = await fintrackSupabase.from('transactions').insert(bulkPayloads).select();
    if (error) throw error;

    state.transactions = data ? [...data, ...state.transactions] : state.transactions;
    renderTransactions();
    resetTransactionForm();
    showToast(`${bulkPayloads.length} transaksi berhasil disimpan.`);
  } catch (error) {
    showToast(error.message || 'Gagal menyimpan transaksi.');
  }
};

const seedBudgetRows = () => {
  if (!budgetRowsContainer) {
    return;
  }

  budgetRowsContainer.innerHTML = '';
  budgetRowsContainer.appendChild(createBudgetRow({ type: budgetTypeInput?.value || 'expense' }));
};

const initialize = async () => {
  initializeTheme();
  setAuthMode('login');
  setActiveView(state.activeView);
  updateStatusBadge();
  seedTransactionRows();
  seedBudgetRows();
  renderCategoryButtons();
  renderBudgetCategoryButtons();
  syncBudgetTypeButtons();
  renderProfile();
  renderTransactions();
  await loadWalletsFromSupabase();
  await loadTransactionsFromSupabase();
  await loadBudgetsFromSupabase();

  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveView(item.dataset.view || 'overview');
    });
  });

  toggleAuthMode.addEventListener('click', () => {
    const nextMode = state.authMode === 'login' ? 'register' : 'login';
    setAuthMode(nextMode);
  });

  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  transactionForm.addEventListener('submit', handleAddTransaction);
  budgetForm?.addEventListener('submit', handleBudgetSubmit);
  budgetPlanList?.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-budget-delete]');
    if (!trigger) {
      return;
    }

    handleDeleteBudget(trigger.dataset.budgetDelete);
  });
  document.querySelectorAll('[data-option-type]').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('transactionType').value = button.dataset.optionType;
      syncTransactionTypeButtons();
    });
  });
  categoryOptionGrid?.addEventListener('click', (event) => {
    const removeTrigger = event.target.closest('.chip-remove');
    if (removeTrigger) {
      event.preventDefault();
      const chip = removeTrigger.closest('[data-category-option]');
      if (chip) {
        removeCategoryOption(chip.dataset.categoryOption);
      }
      return;
    }

    const button = event.target.closest('[data-category-option]');
    if (!button) return;

    const categoryInput = document.getElementById('transactionCategory');
    if (!categoryInput) return;

    categoryInput.value = button.dataset.categoryOption;
    syncCategoryButtons();
  });

  const transactionCategoryInput = document.getElementById('transactionCategory');
  transactionCategoryInput?.addEventListener('input', () => {
    syncCategoryButtons();
  });
  transactionCategoryInput?.addEventListener('change', () => {
    upsertCustomCategory(transactionCategoryInput.value);
  });
  addTransactionRowButton?.addEventListener('click', () => {
    if (!transactionRowsContainer) {
      return;
    }

    transactionRowsContainer.appendChild(
      createTransactionRow({ type: document.getElementById('transactionType')?.value || 'expense' })
    );
  });
  const addBudgetRowButton = document.getElementById('addBudgetRowButton');
  addBudgetRowButton?.addEventListener('click', () => {
    if (!budgetRowsContainer) {
      return;
    }

    budgetRowsContainer.appendChild(
      createBudgetRow({ type: budgetTypeInput?.value || 'expense' })
    );
  });
  transactionRowsContainer?.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.transaction-row-remove');
    if (!removeButton) {
      return;
    }

    const row = removeButton.closest('.transaction-row');
    if (!row) {
      return;
    }

    const remainingRows = transactionRowsContainer.querySelectorAll('.transaction-row');
    if (remainingRows.length <= 1) {
      row.querySelector('.transaction-row-category').value = '';
      row.querySelector('.transaction-row-description').value = '';
      row.querySelector('.transaction-row-type').value = document.getElementById('transactionType')?.value || 'expense';
      row.querySelector('.transaction-row-amount').value = '';
      return;
    }

    row.remove();
  });
  budgetCategoryInput?.addEventListener('input', () => {
    syncBudgetCategoryButtons();
  });
  budgetCategoryInput?.addEventListener('change', () => {
    upsertCustomCategory(budgetCategoryInput.value);
  });
  document.querySelectorAll('[data-budget-type]').forEach((button) => {
    button.addEventListener('click', () => {
      budgetTypeInput.value = button.dataset.budgetType;
      syncBudgetTypeButtons();
    });
  });
  budgetCategoryOptionGrid?.addEventListener('click', (event) => {
    const removeTrigger = event.target.closest('.chip-remove');
    if (removeTrigger) {
      event.preventDefault();
      const chip = removeTrigger.closest('[data-budget-category-option]');
      if (chip) {
        removeCategoryOption(chip.dataset.budgetCategoryOption);
      }
      return;
    }

    const button = event.target.closest('[data-budget-category-option]');
    if (!button) return;

    budgetCategoryInput.value = button.dataset.budgetCategoryOption;
    syncBudgetCategoryButtons();
  });
  document.getElementById('transactionAmount')?.addEventListener('input', (event) => {
    event.target.value = sanitizeNumericInput(event.target.value);
  });
  budgetAmountInput?.addEventListener('input', (event) => {
    event.target.value = sanitizeNumericInput(event.target.value);
  });
  filterTypeSelect.addEventListener('change', (event) => {
    state.filterType = event.target.value;
    renderTransactions();
  });
  monthFilterInput.addEventListener('change', (event) => {
    state.monthFilter = event.target.value;
    renderTransactions();
  });
  userFilterSelect.addEventListener('change', (event) => {
    state.userFilter = event.target.value;
    renderTransactions();
  });
  saveProfileButton.addEventListener('click', handleSaveProfile);
  exportCsvButton.addEventListener('click', exportTransactionsCsv);
  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
  cancelEditButton.addEventListener('click', resetTransactionForm);
  transactionTableBody.addEventListener('click', (event) => {
    const target = event.target.closest('button[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const transactionId = target.dataset.id;

    if (action === 'edit') {
      handleEditTransaction(transactionId);
      return;
    }

    if (action === 'delete') {
      handleDeleteTransaction(transactionId);
    }
  });
  logoutBtn.addEventListener('click', () => {
    toggleAccountMenu();
  });

  summaryFeatureButton?.addEventListener('click', () => {
    toggleSummaryFeatureMenu();
  });

  reportOverviewBackButton?.addEventListener('click', () => {
    restoreReportsDefaultView();
  });

  reportVisualBackButton?.addEventListener('click', () => {
    restoreReportsDefaultView();
  });

  reportBudgetBackButton?.addEventListener('click', () => {
    restoreReportsDefaultView();
  });

  reportDetailBackButton?.addEventListener('click', () => {
    restoreReportsDefaultView();
  });

  reportFilterBackButton?.addEventListener('click', () => {
    restoreReportsDefaultView();
  });

  [reportDetailSearch, reportDetailSearchFull].forEach((input) => {
    input?.addEventListener('input', renderReportDetailView);
  });

  [reportDetailSort, reportDetailSortFull].forEach((select) => {
    select?.addEventListener('change', renderReportDetailView);
  });

  reportDetailPdfButton?.addEventListener('click', exportReportPdf);
  reportDetailPdfButtonFull?.addEventListener('click', exportReportPdf);
  reportDetailCsvButton?.addEventListener('click', exportReportCsv);
  reportDetailCsvButtonFull?.addEventListener('click', exportReportCsv);

  document.querySelectorAll('[data-report-period]').forEach((button) => {
    button.addEventListener('click', () => {
      state.reportFilters.period = button.dataset.reportPeriod;
      syncReportFilterControls();
    });
  });

  reportFilterApplyButton?.addEventListener('click', () => {
    if (reportWalletFilter) state.reportFilters.wallet = reportWalletFilter.value;
    if (reportCategoryFilter) state.reportFilters.category = reportCategoryFilter.value;
    if (reportSubcategoryFilter) state.reportFilters.subcategory = reportSubcategoryFilter.value;
    if (reportTagFilter) state.reportFilters.tag = reportTagFilter.value;
    if (reportStartDate) state.reportFilters.startDate = reportStartDate.value;
    if (reportEndDate) state.reportFilters.endDate = reportEndDate.value;

    syncReportFilterControls();
    renderVisualReportView();
    renderReportOverviewView();
    showToast('Filter laporan diterapkan.');
  });

  reportFilterResetButton?.addEventListener('click', () => {
    state.reportFilters = {
      period: 'monthly',
      wallet: 'all',
      category: 'all',
      subcategory: 'all',
      tag: '',
      startDate: '',
      endDate: '',
    };
    syncReportFilterControls();
    renderVisualReportView();
    renderReportOverviewView();
    showToast('Filter laporan direset.');
  });

  if (summaryFeatureMenu) {
    summaryFeatureMenu.addEventListener('click', (event) => {
      const button = event.target.closest('[data-summary-feature]');
      if (!button) return;

      const feature = button.dataset.summaryFeature;
      summaryFeatureMenu.classList.add('hidden');

      if (feature === 'Dashboard Utama (Ringkasan Cepat)') {
        if (reportDashboardContent) reportDashboardContent.classList.add('hidden');
        if (reportOverviewSubView) reportOverviewSubView.classList.remove('hidden');
        if (reportVisualSubView) reportVisualSubView.classList.add('hidden');
        if (reportBudgetSubView) reportBudgetSubView.classList.add('hidden');
        if (reportFilterSubView) reportFilterSubView.classList.add('hidden');
        renderReportOverviewView();
        return;
      }

      if (feature === 'Visualisasi Data (Diagram & Grafik)') {
        if (reportDashboardContent) reportDashboardContent.classList.add('hidden');
        if (reportOverviewSubView) reportOverviewSubView.classList.add('hidden');
        if (reportVisualSubView) reportVisualSubView.classList.remove('hidden');
        if (reportBudgetSubView) reportBudgetSubView.classList.add('hidden');
        if (reportFilterSubView) reportFilterSubView.classList.add('hidden');
        renderVisualReportView();
        return;
      }

      if (feature === 'Fitur Filter & Periode Waktu') {
        if (reportDashboardContent) reportDashboardContent.classList.add('hidden');
        if (reportOverviewSubView) reportOverviewSubView.classList.add('hidden');
        if (reportVisualSubView) reportVisualSubView.classList.add('hidden');
        if (reportBudgetSubView) reportBudgetSubView.classList.add('hidden');
        if (reportDetailSubView) reportDetailSubView.classList.add('hidden');
        if (reportFilterSubView) reportFilterSubView.classList.remove('hidden');
        populateReportFilterOptions();
        syncReportFilterControls();
        return;
      }

      if (feature === 'Anggaran & Batas Pengeluaran (Budgeting & Alerts)') {
        if (reportDashboardContent) reportDashboardContent.classList.add('hidden');
        if (reportOverviewSubView) reportOverviewSubView.classList.add('hidden');
        if (reportVisualSubView) reportVisualSubView.classList.add('hidden');
        if (reportFilterSubView) reportFilterSubView.classList.add('hidden');
        if (reportDetailSubView) reportDetailSubView.classList.add('hidden');
        if (reportBudgetSubView) reportBudgetSubView.classList.remove('hidden');
        renderBudgetAlertReportView();
        return;
      }

      if (feature === 'Tabel Detail Transaksi & Ekspor Data') {
        if (reportDashboardContent) reportDashboardContent.classList.add('hidden');
        if (reportOverviewSubView) reportOverviewSubView.classList.add('hidden');
        if (reportVisualSubView) reportVisualSubView.classList.add('hidden');
        if (reportBudgetSubView) reportBudgetSubView.classList.add('hidden');
        if (reportFilterSubView) reportFilterSubView.classList.add('hidden');
        if (reportDetailSubView) reportDetailSubView.classList.remove('hidden');
        renderReportDetailView();
        return;
      }

      showToast(feature);
    });

    document.addEventListener('click', (event) => {
      if (!summaryFeatureMenu.classList.contains('hidden')) {
        const clickedInsideMenu = summaryFeatureMenu.contains(event.target) || summaryFeatureButton?.contains(event.target);
        if (!clickedInsideMenu) {
          summaryFeatureMenu.classList.add('hidden');
        }
      }
    });
  }

  if (accountMenu) {
    accountMenu.addEventListener('click', (event) => {
      const button = event.target.closest('[data-menu-action]');
      if (!button) return;

      const action = button.dataset.menuAction;
      accountMenu.classList.add('hidden');

      if (action === 'account') {
        setActiveView('settings');
        showToast('Akun dibuka.');
        return;
      }

      if (action === 'settings') {
        setActiveView('settings');
        showToast('Pengaturan dibuka.');
        return;
      }

      if (action === 'logout') {
        handleLogout();
      }
    });

    document.addEventListener('click', (event) => {
      if (!accountMenu.classList.contains('hidden')) {
        const clickedInsideMenu = accountMenu.contains(event.target) || logoutBtn.contains(event.target);
        if (!clickedInsideMenu) {
          accountMenu.classList.add('hidden');
        }
      }
    });
  }

  refreshButton.addEventListener('click', loadTransactionsFromSupabase);

  if (fintrackSupabase) {
    const { data } = await fintrackSupabase.auth.getSession();
    if (data.session) {
      state.session = data.session;
      logoutBtn.classList.remove('hidden');
      showDashboard();
      updateStatusBadge();
    } else {
      showAuth();
    }

    fintrackSupabase.auth.onAuthStateChange(async (event, session) => {
      state.session = session;
      if (session) {
        syncCurrentProfileName();
        applySessionUserToLookup();
        await refreshSupabaseData();
      } else {
        state.transactions = [];
        state.budgetPlans = [];
        state.userLookup = {};
        renderTransactions();
        renderBudgetPlans();
      }
      renderProfile();
      if (session) {
        logoutBtn.classList.remove('hidden');
        showDashboard();
      } else {
        logoutBtn.classList.add('hidden');
        showAuth();
      }
    });
  } else {
    showAuth();
  }

  await loadTransactionsFromSupabase();
};

initialize();
