<script>
	export let post;
	export let currentUser;
	import { classNames, formatDate } from '$lib/util';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';

	import { t } from '$lib/translations';

	$: teaser_image = JSON.parse(post.teaser_image);
	const lf = new Intl.ListFormat('en');
</script>

<div
	href={`/posts/${post.slug}`}
	class={classNames('md:text-xl rounded-2xl border bg-white p-4 sm:p-8 border-gray-200')}
>
	<div>
		{#if currentUser}
			<div class="text-sm py-2 flex">
				<div class="flex-1">
					<!-- Only show this for the site owner -->
					{#if post.is_public}
						<strong>{$t('common.public', { gender: 'male' })}</strong>
						{#if post.recipients.length > 0}
							(and sent to {lf.format(post.recipients.map(r => r.name))}){/if}
					{:else if post.recipients.length > 0}
						<strong>{$t('common.shared')}</strong> (sent to {lf.format(
							post.recipients.map(r => r.name)
						)})
					{:else}
						{$t('common.private', { gender: 'male' })}
					{/if}
				</div>
				{#if post.is_public}
					<div title="This post is publicly visible.">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
							/>
						</svg>
					</div>
				{/if}
			</div>
		{/if}
		<div>
			<a
				href={`/posts/${post.slug}`}
				class={classNames('text-2xl md:text-3xl lg:text-4xl font-bold')}
			>
				{post.title}
			</a>
		</div>
		{#if teaser_image?.src && teaser_image?.width && teaser_image?.height}
			<a href={`/posts/${post.slug}`}>
				<img
					class="block w-full mt-4"
					src={teaser_image.src}
					width={teaser_image.width}
					height={teaser_image.height}
					alt={post.title}
				/>
			</a>
		{/if}
		<div class="pt-4">
			<div class={teaser_image?.src ? 'line-clamp-3' : 'line-clamp-5'}>
				<a href={`/posts/${post.slug}`}>
					<span class="font-bold"
						>{$t(
							'common.date',
							{ value: new Date(post.created_at) },
							{ date: { FULL: { dateStyle: 'medium' } } }
						)}</span
					>
					— {post.teaser}
				</a>
			</div>
		</div>
	</div>
	<div class="pt-4 flex">
		<SecondaryButton size="sm" href={`/posts/${post.slug}`}>{$t('common.continueRead')} →</SecondaryButton>
	</div>
</div>
