document.querySelectorAll(".like-button").forEach(likeButton => {
    const heartIcon = likeButton.querySelector(".heart-icon");
    const likesAmountLabel = likeButton.querySelector(".likes-amount");
  
    // Récupère les valeurs initiales depuis l'attribut data-* de chaque bouton
    let likesAmount = parseInt(likeButton.dataset.likes);
    const recipeId = likeButton.dataset.recipeId; // ID de la recette
  
    heartIcon.addEventListener("click", () => {
      heartIcon.classList.toggle("liked");
  
      if (heartIcon.classList.contains("liked")) {
        likesAmount++;
      } else {
        likesAmount--;
      }
  
      // Mettre à jour le nombre de likes dans l'interface utilisateur
      likesAmountLabel.innerHTML = likesAmount;
  
      // Envoi de la requête à Flask pour mettre à jour les likes dans la base de données
      fetch(`http://127.0.0.1:5000//update_likes/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: likesAmount,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Likes updated successfully:", data);
      })
      .catch(error => {
        console.error("Error updating likes:", error);
      });
    });
  });