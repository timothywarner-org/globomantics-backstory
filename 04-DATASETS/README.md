# 📊 Datasets - Sample Data for Demos & Exercises

Realistic but fictional datasets for teaching data analysis, visualization, and processing.

---

## 📁 Available Datasets

### 👥 Human Resources
- **employee-data.csv** - 1,000 employee records
  - Fields: ID, name, department, salary, hire_date
  - Use for: Pandas demos, SQL queries, HR analytics

- **performance-reviews.csv** - 3 years of reviews
  - Fields: employee_id, rating, manager, goals
  - Use for: Data joins, performance analysis

### 🤖 IoT & Robotics
- **robot-telemetry.csv** - 10,000 sensor readings
  - Fields: robot_id, timestamp, temperature, battery, location
  - Use for: Time series analysis, anomaly detection

- **maintenance-logs.csv** - Service records
  - Fields: robot_id, service_date, technician, parts_replaced
  - Use for: Predictive maintenance demos

### 💰 Financial
- **sales-transactions.csv** - 5,000 orders
  - Fields: order_id, customer, product, amount, date
  - Use for: Sales dashboards, trend analysis

- **financial-statements.csv** - 5 years quarterly
  - Fields: quarter, revenue, expenses, profit
  - Use for: Financial visualization, forecasting

### 📈 Marketing
- **customer-feedback.csv** - Survey responses
  - Fields: customer_id, satisfaction, NPS, comments
  - Use for: Sentiment analysis, customer insights

- **ab-test-results.csv** - Website experiments
  - Fields: user_id, variant, conversion, time_on_site
  - Use for: Statistical analysis, A/B testing

---

## 🚦 Quick Start

### Python/Pandas
```python
import pandas as pd

df = pd.read_csv('04-DATASETS/employee-data.csv')
print(df.head())
```

### SQL Import
```sql
CREATE TABLE employees AS
SELECT * FROM CSVREAD('04-DATASETS/employee-data.csv');
```

### Excel/Google Sheets
- Open the CSV directly
- Use Data > Import for better control

---

## 📝 Data Notes

- ✅ All data is **completely fictional**
- ✅ Names from [`06-REFERENCE/employee-names.md`](../06-REFERENCE/employee-names.md)
- ✅ Dates are recent but not current
- ✅ Financial figures are realistic but fake
- ✅ No PII or sensitive information

---

## 🎓 Teaching Scenarios

### Beginner
- Load and explore data
- Basic filtering and sorting
- Simple visualizations

### Intermediate  
- Data cleaning and transformation
- Joining multiple datasets
- Statistical analysis

### Advanced
- Machine learning prep
- Time series forecasting
- Performance optimization

---

## 🤝 Contributing

New datasets should:
- ✅ Be completely fictional
- ✅ Have clear column headers
- ✅ Include a data dictionary
- ✅ Be appropriately sized (not too big/small)
- ✅ Represent realistic patterns