// ====== Application State Logic ======
let loggedMeals = [];

// ====== DOM Node Selectors ======
const foodForm = document.getElementById('food-form');
const foodNameInput = document.getElementById('food-name');
const foodCaloriesInput = document.getElementById('food-calories');
const foodList = document.getElementById('food-list');
const emptyState = document.getElementById('empty-state');
const totalCaloriesDisplay = document.getElementById('total-calories');
const itemCountDisplay = document.getElementById('item-count');
const btnFetch = document.getElementById('btn-fetch');
const btnReset = document.getElementById('btn-reset');

// ====== Initialization Handler ======
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('nutriTrackMeals');
    if (storedData) {
        loggedMeals = JSON.parse(storedData);
    }
    syncUserInterface();
});

// ====== UI Synchronization Layer ======
function syncUserInterface() {
    // 1. Wipe current list contents cleanly
    foodList.innerHTML = '';
    
    let cumulativeCalories = 0;

    if (loggedMeals.length === 0) {
        emptyState.classList.remove('hidden');//This removes hidden class from emptyState and displays a message visible to user
        foodList.classList.add('hidden');//hides the food list which is empty
    } else {
        emptyState.classList.add('hidden');
        foodList.classList.remove('hidden');

        // 2. Loop state arrays and render structured dynamic components
        loggedMeals.forEach((meal) => {
            cumulativeCalories += meal.calories;// Adds the the calories to achieve the total calories count

            const listItem = document.createElement('li');
            listItem.className = "flex justify-between items-center py-3.5 group transition-all";
            
            listItem.innerHTML = `
                <div class="pr-4">
                    <p class="font-semibold text-gray-800 text-sm capitalize">${meal.name}</p>
                    <p class="text-xs text-emerald-500 font-medium">${meal.calories} kcal</p>
                </div>
                <button aria-label="Remove item" 
                    class="btn-delete text-gray-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200"
                    data-id="${meal.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            foodList.appendChild(listItem);
        });
    }

    // 3. Keep metrics updating in real-time
    totalCaloriesDisplay.innerHTML = `${cumulativeCalories} <span class="text-sm font-medium text-gray-500">kcal</span>`;//used it because it's injecting actual HTML
    itemCountDisplay.innerText = `${loggedMeals.length} item${loggedMeals.length === 1 ? '' : 's'}`;//to have correct grammar
    
    // 4. Mirror in-memory local cache state to structural browser store
    localStorage.setItem('nutriTrackMeals', JSON.stringify(loggedMeals));
}

// ====== Event Handling Form Controls ======
foodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValue = foodNameInput.value.trim();
    const calorieValue = parseInt(foodCaloriesInput.value, 10);

    if (!nameValue || isNaN(calorieValue) || calorieValue <= 0) //check for input error
        return;

    // Create unique meal entity map
    const entryPayload = {
        id: Date.now().toString(),//creates a unique id making it easier to delete in future
        name: nameValue,
        calories: calorieValue
    };

    loggedMeals.push(entryPayload);
    syncUserInterface();
    foodForm.reset();
    foodNameInput.focus();// puts typing cursor back to food name
});

// ====== Delegated Event Action Logic (Deletions) ======
foodList.addEventListener('click', (e) => {
    // Capture targeted button reference handling both SVG paths and buttons cleanly
    const targetButton = e.target.closest('.btn-delete');//looks at the parent button with the (.btn-delete) class since the trash icon 
    if (!targetButton) 
        return;

    const targetId = targetButton.getAttribute('data-id');//fetches the serial no of the meal you want to destroy
    // Drop the element matching unique timestamp IDs from storage arrays
    loggedMeals = loggedMeals.filter(meal => meal.id !== targetId);//keeps meals in the array whose id doesn't match the target id
    
    syncUserInterface();
});

// ====== Clear State Data Reset Handling ======
btnReset.addEventListener('click', () => {
    if (loggedMeals.length === 0) 
        return;
    
    if (confirm('Are you sure you want to clear your full tracking canvas logs for the day?')) {
        loggedMeals = [];
        syncUserInterface();
    }
});

// ====== Asynchronous Fetch API Simulation Database Lookup Logic ======
btnFetch.addEventListener('click', async () => {
    const lookupQuery = foodNameInput.value.trim().toLowerCase();
    
    if (!lookupQuery) {
        alert('Please type a food name first (e.g., apple, banana, egg) to search our database.');
        return;
    }

    // Visual loading affordance indicator change
    btnFetch.innerText = 'Searching...';
    btnFetch.disabled = true;

    try {
        // Fetch tracking local database structure route mappings
        const response = await fetch('calorie.json');
        
        if (!response.ok) {
            throw new Error('Database pipeline processing failed.');
        }

        const dataStore = await response.json();

        if (lookupQuery in dataStore) {
            foodCaloriesInput.value = dataStore[lookupQuery];
        } else {
            alert(`"${lookupQuery}" wasn't found in our simulated catalog database. You can still input its calorie value manually!`);
        }
    } catch (error) {
        console.error('Fetch execution processing error:', error);
        alert('An issue occurred reaching the mock database pipeline.');
    } finally {
        // Reset interactive visual trigger buttons 
        btnFetch.innerText = ' Auto-fill Calories';
        btnFetch.disabled = false;
    }
});