"use client"

import { useState } from "react"
import styles from "./App.module.css"

const gameData = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    image: "/placeholder.svg?height=400&width=300",
    price: "$59.99",
    copies: 3,
    owners: ["rober", "thiago", "fran"],
    isMultiplayer: false,
    isCooperative: false,
    isSurvival: false,
    isShooter: true,
    playerCount: "1",
  },
  {
    id: 2,
    title: "Valheim",
    image: "/placeholder.svg?height=400&width=300",
    price: "$19.99",
    copies: 6,
    owners: ["rober", "thiago", "fran", "kevin", "lucas", "mati"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: true,
    isShooter: false,
    playerCount: "1-10",
  },
  {
    id: 3,
    title: "Call of Duty",
    image: "/placeholder.svg?height=400&width=300",
    price: "$69.99",
    copies: 4,
    owners: ["rober", "kevin", "lucas", "mati"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: false,
    isShooter: true,
    playerCount: "1-150",
  },
  {
    id: 4,
    title: "Minecraft",
    image: "/placeholder.svg?height=400&width=300",
    price: "$26.95",
    copies: 5,
    owners: ["thiago", "fran", "kevin", "lucas", "mati"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: true,
    isShooter: false,
    playerCount: "1-∞",
  },
  {
    id: 5,
    title: "Apex Legends",
    image: "/placeholder.svg?height=400&width=300",
    price: "Free",
    copies: 6,
    owners: ["rober", "thiago", "fran", "kevin", "lucas", "mati"],
    isMultiplayer: true,
    isCooperative: false,
    isSurvival: true,
    isShooter: true,
    playerCount: "3-60",
  },
  {
    id: 6,
    title: "Stardew Valley",
    image: "/placeholder.svg?height=400&width=300",
    price: "$14.99",
    copies: 4,
    owners: ["rober", "thiago", "fran", "lucas"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: false,
    isShooter: false,
    playerCount: "1-4",
  },
  {
    id: 7,
    title: "Among Us",
    image: "/placeholder.svg?height=400&width=300",
    price: "$4.99",
    copies: 6,
    owners: ["rober", "thiago", "fran", "kevin", "lucas", "mati"],
    isMultiplayer: true,
    isCooperative: false,
    isSurvival: false,
    isShooter: false,
    playerCount: "4-15",
  },
  {
    id: 8,
    title: "Rocket League",
    image: "/placeholder.svg?height=400&width=300",
    price: "Free",
    copies: 5,
    owners: ["rober", "kevin", "lucas", "mati", "fran"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: false,
    isShooter: false,
    playerCount: "1-8",
  },
  {
    id: 9,
    title: "The Forest",
    image: "/placeholder.svg?height=400&width=300",
    price: "$19.99",
    copies: 3,
    owners: ["thiago", "kevin", "lucas"],
    isMultiplayer: true,
    isCooperative: true,
    isSurvival: true,
    isShooter: false,
    playerCount: "1-8",
  },
]

export default function App() {
  const [openCards, setOpenCards] = useState([])

  const toggleCard = (id) => {
    setOpenCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id);
      } else {
        return [id]; // Ensure only one card is open at a time
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.purpleBlob1}></div>
        <div className={styles.purpleBlob2}></div>
        <div className={styles.purpleBlob3}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className={styles.gridPattern}></div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Game Collection</h1>

        <div className={styles.grid}>
          {gameData.map((game) => {
            // Log which cards are in the openCards array
            const isOpen = openCards.includes(game.id);
            console.log(`Rendering card ${game.id}, isOpen: ${isOpen}, openCards: [${openCards.join(', ')}]`);
            
            return (
              <GameCard
                key={game.id}
                game={game}
                isOpen={isOpen}
                onToggle={() => toggleCard(game.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

function GameCard({ game, isOpen, onToggle }) {
  // Log the open state for debugging
  console.log(`Card ${game.id} isOpen: ${isOpen}`);
  
  return (
    <div className={styles.card}>
      {/* Number Circle */}
      {!isOpen && <div className={styles.numberCircle}>{game.id}</div>}

      <div className={styles.cardContent}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img src={game.image || "/placeholder.svg"} alt={game.title} className={styles.gameImage} />
          <div className={styles.imageOverlay}></div>
          <h3 className={styles.gameTitle}>{game.title}</h3>
        </div>

        {/* Collapsible Content */}
        <div className={styles.collapsible}>
          <button className={`${styles.collapsibleTrigger} ${isOpen ? styles.open : ""}`} onClick={onToggle}>
            <span className={styles.detailsText}>Ver detalles</span>
            <svg
              className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>

          {/* Only render content when isOpen is true */}
          {isOpen && (
            <div className={styles.collapsibleContent}>
              <div className={styles.detailsContainer}>
                {/* Price */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Precio:</span>
                  <span className={styles.price}>{game.price}</span>
                </div>

                {/* Copies */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Copias:</span>
                  <span className={styles.detailValue}>{game.copies}</span>
                </div>

                {/* Owners */}
                <div className={styles.ownersSection}>
                  <span className={styles.detailLabel}>Propietarios:</span>
                  <div className={styles.ownersList}>
                    {game.owners.map((owner) => (
                      <span key={owner} className={styles.ownerTag}>
                        {owner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Game Features */}
                <div className={styles.featuresSection}>
                  <span className={styles.detailLabel}>Características:</span>
                  <div className={styles.featuresList}>
                    {game.isMultiplayer && (
                      <div className={styles.featureTag}>
                        <span>👥</span>
                        Multijugador
                      </div>
                    )}
                    {game.isCooperative && (
                      <div className={styles.featureTag}>
                        <span>🎮</span>
                        Cooperativo
                      </div>
                    )}
                    {game.isSurvival && (
                      <div className={styles.featureTag}>
                        <span>🛡️</span>
                        Survival
                      </div>
                    )}
                    {game.isShooter && (
                      <div className={styles.featureTag}>
                        <span>🎯</span>
                        Shooter
                      </div>
                    )}
                  </div>
                </div>

                {/* Player Count */}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Jugadores:</span>
                  <span className={styles.detailValue}>{game.playerCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
