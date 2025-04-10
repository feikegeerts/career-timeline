<script lang="ts">
  import type { CareerEvent } from "$lib/types";

  export let careerEvents: CareerEvent[];
  export let selectedEventId: number | null = null;
  export let onSelect: (id: number) => void;
  export let onClose: () => void;
</script>

<div class="timeline-container detailed-timeline">
  {#each careerEvents as event}
    {@const isSelected =
      selectedEventId !== null && event.id === selectedEventId}
    {@const currentIndex =
      selectedEventId !== null
        ? careerEvents.findIndex((e) => e.id === selectedEventId)
        : -1}
    {@const eventIndex = careerEvents.findIndex((e) => e.id === event.id)}
    {@const position = selectedEventId !== null ? eventIndex - currentIndex : 0}

    <div
      class="timeline-item detailed-item"
      class:selected={isSelected}
      class:adjacent={selectedEventId !== null && Math.abs(position) === 1}
      on:click={() => onSelect(event.id)}
      on:keydown={(e) => e.key === "Enter" && onSelect(event.id)}
      tabindex={selectedEventId === null || Math.abs(position) <= 1 ? 0 : -1}
      role="button"
      aria-label="View details for {event.title} at {event.company}"
    >
      <div class="timeline-content">
        <div class="timeline-date">{event.period}</div>
        <h2>{event.title}</h2>
        <h3>{event.company}</h3>

        {#if isSelected}
          <p class="event-description">
            {event.description}
          </p>
        {/if}

        {#if isSelected}
          <button class="close-button" on:click|stopPropagation={onClose}>
            <span class="close-icon">×</span>
          </button>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .timeline-container {
    position: relative;
    padding: 1em 0;
  }

  .timeline-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50px;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(62, 132, 255, 0.2),
      var(--primary),
      rgba(62, 132, 255, 0.2)
    );
    transform: scaleY(0);
    transform-origin: top;
    animation: timeline-appear 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }

  @keyframes timeline-appear {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .detailed-timeline {
    height: auto;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2em 0;
  }

  .detailed-timeline::before {
    opacity: 0.8;
  }

  .detailed-item {
    position: relative;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    margin-bottom: 2em;
    padding-left: 80px;
    cursor: pointer;
    transform-origin: left center;
  }

  .detailed-item::before {
    content: "";
    position: absolute;
    left: 42px;
    top: 26px;
    width: 16px;
    height: 16px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    background-color: var(--background);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 0 0 0 rgba(62, 132, 255, 0.4);
  }

  .detailed-item:hover::before:not(.selected) {
    box-shadow: 0 0 0 6px rgba(62, 132, 255, 0.2);
  }

  .detailed-item.selected {
    z-index: 10;
    opacity: 1;
    transform: scale(1.05) translateX(10px);
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }

  .detailed-item.selected .timeline-content {
    box-shadow:
      0 15px 35px rgba(0, 0, 0, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.07);
    background-color: var(--background);
    border-left: 4px solid var(--primary);
  }

  .detailed-item.selected::before {
    width: 24px;
    height: 24px;
    left: 25px;
    top: 23px;
    background-color: var(--primary);
    border-color: var(--background);
    transform: scale(1.1);
    box-shadow: 0 0 0 8px rgba(62, 132, 255, 0.3);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(62, 132, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(62, 132, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(62, 132, 255, 0);
    }
  }

  .timeline-content {
    background-color: var(--surface);
    border-radius: 8px;
    padding: 1.8em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
  }

  .timeline-content:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    transition: width 0.6s ease;
  }

  .detailed-item:hover .timeline-content:before {
    width: 100%;
  }

  .timeline-date {
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.7em;
    letter-spacing: 0.5px;
    font-size: 0.95em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(10px);
    animation: fade-in-up 0.5s forwards;
    animation-delay: 0.1s;
  }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    margin: 0 0 0.5em 0;
    font-size: 1.5em;
    font-weight: 600;
    opacity: 0;
    transform: translateY(10px);
    animation: fade-in-up 0.5s forwards;
    animation-delay: 0.2s;
    color: var(--text);
  }

  h3 {
    margin: 0 0 1em 0;
    font-size: 1.1em;
    color: var(--text-light);
    font-weight: normal;
    opacity: 0;
    transform: translateY(10px);
    animation: fade-in-up 0.5s forwards;
    animation-delay: 0.3s;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    color: var(--text-light);
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .close-button:hover {
    background-color: rgba(62, 132, 255, 0.1);
    color: var(--primary);
    transform: rotate(90deg);
  }

  .close-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .event-description {
    margin-top: 1.5em;
    line-height: 1.6;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    transform: translateY(20px);
    color: var(--text);
  }

  .detailed-item.selected .event-description {
    font-size: 1.1em;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    animation: fade-in-up 0.8s forwards;
    animation-delay: 0.4s;
  }

  @media (max-width: 640px) {
    .detailed-item::before {
      left: 12px;
    }

    .detailed-item.selected::before {
      left: 10px;
    }

    .detailed-item {
      padding-left: 50px;
    }
  }
</style>
