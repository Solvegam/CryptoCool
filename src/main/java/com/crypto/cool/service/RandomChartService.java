package com.crypto.cool.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface RandomChartService {

	Map<String, List<BigDecimal>> generate(final BigDecimal price);

}
