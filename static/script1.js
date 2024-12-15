document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personal-info-form');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const inputs = form.querySelectorAll('input');

    editButton.addEventListener('click', () => {
        inputs.forEach(input => input.disabled = false);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const userData = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
    
        try {
            const userId = window.location.pathname.split('/')[2];  // Extract user_id from the URL
            const response = await fetch(`http://127.0.0.1:5000/user/${userId}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                inputs.forEach(input => input.disabled = true);
                editButton.style.display = 'inline-block';
                saveButton.style.display = 'none';
            } else {
                const error = await response.json();
                alert(error.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating user information');
        }
    });
    

    const recipesGrid = document.querySelector('.recipes-grid');

    recipesGrid.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-recipe')) {
            const recipeElement = event.target.closest('.recipe');
            const recipeId = recipeElement.dataset.recipeId;

            const confirmDelete = confirm('Are you sure you want to delete this recipe?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/delete_recipe/${recipeId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        recipeElement.remove();
                        alert('Recipe deleted successfully');
                    } else {
                        const error = await response.json();
                        alert(error.error);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the recipe');
                }
            }
        }
    });
});
