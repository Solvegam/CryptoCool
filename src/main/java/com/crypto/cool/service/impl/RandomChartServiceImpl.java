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

	private final static int MAX_VALUE = 10000;
	private final static String KEY_CHART = "chart";
	private final static Random RANDOM = new Random();

	@Override
	public Map<String, List<BigDecimal>> generate(final BigDecimal price){
		final Map<String, List<BigDecimal>> result = new HashMap<>();
		final List<BigDecimal> resultList = new ArrayList<>();

		for(int i = 0; i < MAX_VALUE; i++){
			fillList(resultList, price);
		}

		result.put(KEY_CHART, resultList);
		return result;
	}

	private void fillList(final List<BigDecimal> resultList, final BigDecimal price) {
		final double maxOrMin = getMaxOrMin(price);

		resultList.add(BigDecimal.valueOf(maxOrMin).setScale(2, ROUND_CEILING));
	}

	private double getMaxOrMin(final BigDecimal price){
		final double max = price.add(price.multiply(valueOf(Math.random() * 0.1))).doubleValue();
		final double min = price.subtract(price.multiply(valueOf(Math.random() * 0.1))).doubleValue();

		return RANDOM.nextBoolean() ? max : min;
	}

}
