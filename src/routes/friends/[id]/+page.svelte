<script>
  import EditorToolbar from '$lib/components/EditorToolbar.svelte';
  import { fetchJSON } from '$lib/util';
  import { goto } from '$app/navigation';
  import PlainText from '$lib/components/PlainText.svelte';

  export let data;
  let editable, name, email, createdAt, updatedAt;

  $: currentUser = data.currentUser;
  $: {
    // HACK: To make sure this is only run when the parent passes in new data
    data = data;
    initOrReset();
  }

  function initOrReset() {
    name = data.name;
    email = data.email;
    createdAt = data.createdAt;
    updatedAt = data.updatedAt;
    editable = true;
  }

  async function deleteFriend() {
    if (!currentUser) return alert('Sorry, you are not authorized.');
    if (confirm('Are you sure you want to delete this friend? It cannot be undone.')) {
      try {
        await fetchJSON('POST', '/api/delete-friend', {
          friendId: data.friendId
        });
        goto('/friends');
      } catch (err) {
        console.error(err);
        alert('Error deleting friend. Try again.');
      }
    }
  }

  async function saveFriend() {
    if (!currentUser) return alert('Sorry, you are not authorized.');
    try {
      const result = await fetchJSON('POST', '/api/update-friend', {
        friendId: data.friendId,
        name,
        email
      });
      updatedAt = result.updatedAt;
      goto('/friends');
    } catch (err) {
      console.error(err);
      alert(
        'There was an error. You can try again, but before that, please just copy and paste your article into a safe place.'
      );
    }
  }
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

{#if editable}
  <EditorToolbar {currentUser} on:cancel={() => goto('/friends')} on:save={saveFriend} />
{/if}

<div class="max-w-screen-md mx-auto px-6 pb-8 sm:text-xl">
  <div class="pt-24 text-sm font-bold">Name</div>

  <div class="font-bold text-2xl">
    <PlainText {editable} bind:content={name} />
  </div>
  
  <div class="pt-8 text-sm font-bold">Email</div>
  <PlainText {editable} bind:content={email} />

  <div class="text-center pt-12">
    <button class="rounded-lg border w-full py-2 border-red-600 text-red-600" on:click={deleteFriend}>Delete friend</button>
  </div>
</div>