<script lang="ts">
  import { onMount } from "svelte";
  import TimelineView from "$lib/components/TimelineView.svelte";

  let selectedEventId: number | null = null;
  let isTransitioning = false;
  let timelineViewComponent: TimelineView;

  const careerEvents = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Company",
      period: "Jan 2020 - Present",
      description: "Developing web applications using modern frameworks.",
    },
    {
      id: 2,
      title: "Intern",
      company: "Another Tech Company",
      period: "Jun 2019 - Dec 2019",
      description: "Assisted in developing internal tools and applications.",
    },
    // Add more events as needed
  ];
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

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel, { passive: false });
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
    bind:this={timelineViewComponent}
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
