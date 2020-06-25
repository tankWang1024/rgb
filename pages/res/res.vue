<template>
	<view>
		<!-- <view v-for="(item,index) in rgbArr">
			<view style="margin: 20px 0;">
				<view>
					r:{{item.r}}
				</view>
				<view>
					g:{{item.g}}
				</view>
				<view>
					b:{{item.b}}
				</view>
				<view>
					浓度:{{MIC[index]}}
				</view>
			</view>
		</view> -->
		<view class="">
			<view class="img"></view>
			<view class="num"></view>
			<view class="rgb">
				<text>R:</text>
				<text>G:</text>
				<text>B:</text>
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'

	import Chart from 'chart.js';

	export default {
		data() {
			return {
				MIC: [],
				rgbArr: [],
				ctx: null,
			}
		},
		onReady() {

		},
		onLoad() {
			this.MIC = app.globalData.MIC;
			this.rgbArr = app.globalData.rgbArr;
			
		}
	}
</script>

<style>
</style>
