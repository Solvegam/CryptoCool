package com.crypto.cool.core.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.crypto.cool.core.RandomChartService;

@Component
public class RandomChartServiceImpl implements RandomChartService {

	private final static int MAX_VALUE = 10000;
	private final static String KEY_CHART = "chart";

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

	private void fillList(final List<BigDecimal> resultList, final BigDecimal price){
		final BigDecimal max = price.add(BigDecimal.TEN);  // TODO: 2/9/17 fix if price is 0.00012, must count that
		final BigDecimal min = price.min(BigDecimal.TEN);  // TODO: 2/9/17 the same

		resultList.add(BigDecimal.valueOf(Math.random() * (max.min(min).doubleValue())));
	}

}
