<script lang="ts">
  import type { CareerEvent } from '$lib/types';
  
  export let careerEvents: CareerEvent[];
  export let selectedEventId: number | null = null;
  export let onSelect: (id: number) => void;
  export let onClose: () => void;
  export let showAllEvents: boolean = false;
</script>

<div class="timeline-container detailed-timeline">
  {#each careerEvents as event}
    {@const isSelected = selectedEventId !== null && event.id === selectedEventId}
    {@const currentIndex = selectedEventId !== null ? careerEvents.findIndex((e) => e.id === selectedEventId) : -1}
    {@const eventIndex = careerEvents.findIndex((e) => e.id === event.id)}
    {@const position = selectedEventId !== null ? eventIndex - currentIndex : 0}

    <div
      class="timeline-item detailed-item"
      class:selected={isSelected}
      class:adjacent={selectedEventId !== null && Math.abs(position) === 1}
      class:hidden={!showAllEvents && selectedEventId !== null && Math.abs(position) > 1}
      on:click={() => onSelect(event.id)}
      on:keydown={(e) => e.key === "Enter" && onSelect(event.id)}
      tabindex={showAllEvents || selectedEventId === null || Math.abs(position) <= 1 ? 0 : -1}
      role="button"
      aria-label="View details for {event.title} at {event.company}"
    >
      <div class="timeline-content">
        <div class="timeline-date">{event.period}</div>
        <h2>{event.title}</h2>
        <h3>{event.company}</h3>

        {#if isSelected}
          <p class="event-description" class:fade-in={isSelected}>
            {event.description}
          </p>
        {/if}

        {#if isSelected && !showAllEvents}
          <button class="close-button" on:click|stopPropagation={onClose}>×</button>
          <div class="navigation-hint">
            <span>Use arrow keys or mouse wheel to navigate</span>
          </div>
        {:else if isSelected && showAllEvents}
          <button class="close-button" on:click|stopPropagation={onClose}>×</button>
          <div class="navigation-hint">
            <span>Use arrow keys or mouse wheel to navigate</span>
          </div>
        {/if}
      </div>
    </div>
  {/each}

  {#if !showAllEvents}
    <button class="back-button" on:click={onClose}>
      Back to Overview
    </button>
  {/if}
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
    left: calc(50px - 1px);
    width: 2px;
    height: 100%;
    background-color: #ff3e00;
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
    opacity: 0.6;
  }

  .detailed-item {
    position: relative;
    transition: all 0.5s ease;
    margin-bottom: 2em;
    opacity: 0.7;
    padding-left: 80px;
    cursor: pointer;
  }

  .detailed-item::before {
    content: "";
    position: absolute;
    left: 42px;
    top: 10px;
    width: 16px;
    height: 16px;
    border: 2px solid #ff3e00;
    border-radius: 50%;
    background-color: white;
  }

  .detailed-item.hidden {
    display: none;
  }

  .detailed-item.selected {
    z-index: 10;
    opacity: 1;
    transform: scale(1.1);
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .detailed-item.selected .timeline-content {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    border-left: 4px solid #ff3e00;
  }

  .detailed-item.selected::before {
    width: 20px;
    height: 20px;
    left: 40px;
    background-color: #ff3e00;
    border-color: #fff;
  }

  .detailed-item.adjacent {
    z-index: 5;
    opacity: 0.7;
  }

  .detailed-item.adjacent .timeline-content {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .timeline-content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .timeline-date {
    font-weight: bold;
    color: #ff3e00;
    margin-bottom: 0.5em;
  }

  h2 {
    margin: 0 0 0.5em 0;
    font-size: 1.4em;
  }

  h3 {
    margin: 0 0 1em 0;
    font-size: 1.1em;
    color: #666;
    font-weight: normal;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: #ff3e00;
    color: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background-color: #cc3200;
    transform: scale(1.1);
  }

  .navigation-hint {
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    color: #666;
    pointer-events: none;
  }

  .back-button {
    align-self: center;
    margin-top: 2em;
    padding: 0.8em 1.5em;
    background-color: #f8f9fa;
    border: 2px solid #ff3e00;
    color: #ff3e00;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .back-button:hover {
    background-color: #ff3e00;
    color: white;
  }

  .event-description {
    margin-top: 1em;
    line-height: 1.5;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  .event-description.fade-in {
    opacity: 1;
  }

  .detailed-item.selected .event-description {
    font-size: 1.1em;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
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
