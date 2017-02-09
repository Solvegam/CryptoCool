package com.crypto.cool.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface RandomChartService {

	List<Double> generate(final BigDecimal price);

}
