<template>
	<div class="contact">
		<div>
			<h1>客服电话</h1>
			<div class="contact-btn"><x-button><img src="/src/assets/images/icons/icon21.png">400-607-1177</x-button></div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>
<style lang="scss">
  	.contact {
		h1 {
			text-align: center;
			font-size: 20px;
			font-weight: normal;
			line-height: 80px;
			padding-top: 40px;
		}
		.contact-btn {
			padding: 15px;
			button {
				background: #7ebe5c;
				color: #fff;
				img {
					position: relative;
					top: 3px;
					width: 20px;
					margin-right: 10px;
				}
			}
		}
  	}
</style>
