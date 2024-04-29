<script lang="ts">
    let className = '';
    export let slot
    export {className as class}
</script>

<div class={className}>
    {slot}
</div>
