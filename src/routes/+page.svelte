<script lang="ts">
  import { onMount } from "svelte";
  import { careerEvents } from "$lib/data/careerEvents";
  import TimelineView from "$lib/components/TimelineView.svelte";

  let selectedEventId: number | null = null;
  let isTransitioning = false;

  function selectEvent(id: number): void {
    selectedEventId = id;
  }

  function closeDetailedView(): void {
    selectedEventId = null;
  }

  function goToNextEvent(): void {
    if (selectedEventId === null) {
      // If no event is selected, select the first one
      if (careerEvents.length > 0) {
        selectedEventId = careerEvents[0].id;
      }
      return;
    }

    const currentIndex = careerEvents.findIndex(
      (event) => event.id === selectedEventId
    );
    if (currentIndex < careerEvents.length - 1) {
      selectedEventId = careerEvents[currentIndex + 1].id;
    }
  }

  function goToPreviousEvent(): void {
    if (selectedEventId === null) {
      // If no event is selected, select the last one
      if (careerEvents.length > 0) {
        selectedEventId = careerEvents[careerEvents.length - 1].id;
      }
      return;
    }

    const currentIndex = careerEvents.findIndex(
      (event) => event.id === selectedEventId
    );
    if (currentIndex > 0) {
      selectedEventId = careerEvents[currentIndex - 1].id;
    }
  }

  function handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case "Escape":
        closeDetailedView();
        break;
      case "ArrowDown":
      case "ArrowRight":
        goToNextEvent();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        goToPreviousEvent();
        break;
    }
  }

  function handleWheel(event: WheelEvent): void {
    // Throttle to prevent too rapid navigation
    if (isTransitioning) return;

    isTransitioning = true;
    setTimeout(() => {
      isTransitioning = false;
    }, 300);

    if (event.deltaY > 0) {
      goToNextEvent();
    } else {
      goToPreviousEvent();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleWheel);
    };
  });
</script>

<main>
  <header>
    <h1>My Career Timeline</h1>
    <p>A chronological journey through my professional experience</p>
  </header>
  <TimelineView
    {careerEvents}
    {selectedEventId}
    onSelect={selectEvent}
    onClose={closeDetailedView}
  />
</main>

<style>
  main {
    padding: 2em;
    max-width: 800px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 3em;
  }

  h1 {
    color: var(--primary);
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }
</style>
