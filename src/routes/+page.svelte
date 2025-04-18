<script lang="ts">
  import { onMount } from "svelte";
  import TimelineView from "$lib/components/TimelineView.svelte";
  import type { CareerEvent } from "$lib/types";

  let selectedEventId: number | null = null;
  let isTransitioning = false;
  let timelineViewComponent: TimelineView;
  let careerEvents: CareerEvent[] = [];
  let error: string | null = null;

  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;
  const isDev = import.meta.env.DEV;

  async function fetchCareerEvents() {
    try {
      const fetchUrl = isDev ? '/api-proxy' : apiUrl;
      console.log(`Fetching from: ${fetchUrl}`);
      
      const response = await fetch(fetchUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      careerEvents = data.careerEvents;
      console.log("Successfully loaded career events");
    } catch (err: unknown) {
      console.error("API Error:", err);
      if (err instanceof TypeError && err.message.includes('NetworkError')) {
        error = 'CORS error: Unable to access the API. This might be a cross-origin request issue.';
      } else {
        error = err instanceof Error ? err.message : 'An unknown error occurred fetching career events';
      }
    }
  }

  onMount(() => {
    fetchCareerEvents();
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleWheel);
    };
  });

  function selectEvent(id: number): void {
    selectedEventId = id;
    setTimeout(() => {
      timelineViewComponent.scrollSelectedIntoView();
    }, 10);
  }

  function closeDetailedView(): void {
    selectedEventId = null;
  }

  function goToNextEvent(): void {
    if (selectedEventId === null) {
      if (careerEvents.length > 0) {
        selectedEventId = careerEvents[0].id;
        setTimeout(() => {
          timelineViewComponent.scrollSelectedIntoView();
        }, 10);
      }
      return;
    }

    const currentIndex = careerEvents.findIndex(
      (event) => event.id === selectedEventId
    );
    if (currentIndex < careerEvents.length - 1) {
      selectedEventId = careerEvents[currentIndex + 1].id;
      setTimeout(() => {
        timelineViewComponent.scrollSelectedIntoView();
      }, 10);
    }
  }

  function goToPreviousEvent(): void {
    if (selectedEventId === null) {
      if (careerEvents.length > 0) {
        selectedEventId = careerEvents[careerEvents.length - 1].id;
        setTimeout(() => {
          timelineViewComponent.scrollSelectedIntoView();
        }, 10);
      }
      return;
    }

    const currentIndex = careerEvents.findIndex(
      (event) => event.id === selectedEventId
    );
    if (currentIndex > 0) {
      selectedEventId = careerEvents[currentIndex - 1].id;
      setTimeout(() => {
        timelineViewComponent.scrollSelectedIntoView();
      }, 10);
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

  let wheelAccumulator = 0;
  const WHEEL_THRESHOLD = 50;

  function handleWheel(event: WheelEvent): void {
    event.preventDefault();

    wheelAccumulator += Math.abs(event.deltaY);

    if (wheelAccumulator < WHEEL_THRESHOLD) return;

    wheelAccumulator = 0;

    // Throttle to prevent too rapid navigation
    if (isTransitioning) return;

    isTransitioning = true;
    setTimeout(() => {
      isTransitioning = false;
    }, 500);

    if (event.deltaY > 0) {
      goToNextEvent();
    } else {
      goToPreviousEvent();
    }
  }
</script>

<main>
  <header>
    <h1>My Career Timeline</h1>
    <p>A chronological journey through my professional experience</p>
  </header>
  {#if error}
    <p class="error">Error: {error}</p>
  {:else if careerEvents.length === 0}
    <p>Loading...</p>
  {:else}
    <TimelineView
      {careerEvents}
      {selectedEventId}
      onSelect={selectEvent}
      onClose={closeDetailedView}
      bind:this={timelineViewComponent}
    />
  {/if}
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

  .error {
    color: red;
    text-align: center;
    padding: 1em;
    background-color: #ffeeee;
    border-radius: 4px;
    max-width: 600px;
    margin: 2em auto;
  }
</style>
