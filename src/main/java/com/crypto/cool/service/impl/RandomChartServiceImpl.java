package com.crypto.cool.service.impl;

import static java.math.BigDecimal.ROUND_CEILING;
import static java.math.BigDecimal.valueOf;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.crypto.cool.service.RandomChartService;

@Component
public class RandomChartServiceImpl implements RandomChartService {

	private final static int MAX_VALUE = 1000;
	private final static Random RANDOM = new Random();

	@Override
	public List<Double> generate(final BigDecimal price){
		final Map<String, List<Double>> result = new HashMap<>();
		final List<Double> resultList = new ArrayList<>();

		for(int i = 0; i < MAX_VALUE; i++){
			fillList(resultList, price);
		}
		return resultList;
	}

	private void fillList(final List<Double> resultList, final BigDecimal price) {
		BigDecimal priceToPass;
		if ( resultList.size() == 0 ){
			priceToPass = price;
		}
		else {
			priceToPass = BigDecimal.valueOf(resultList.get(resultList.size()-1));
		}
		final double maxOrMin = getMaxOrMin(priceToPass);
		resultList.add(maxOrMin);
	}

	private double getMaxOrMin(final BigDecimal price){
		final double max = price.add(price.multiply(valueOf(Math.random() * 0.007))).doubleValue();
		final double min = price.subtract(price.multiply(valueOf(Math.random() * 0.007))).doubleValue();

		return RANDOM.nextBoolean() ? max : min;
	}

}
