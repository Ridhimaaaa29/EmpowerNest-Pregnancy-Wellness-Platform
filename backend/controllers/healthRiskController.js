const HealthRisk = require('../models/HealthRisk');

// AI Insights Simulation Logic
const generateAIInsights = (age, weight, medicalConditions = []) => {
  const insights = [];
  const recommendations = [];

  // Age-based insights
  if (age < 20 || age > 35) {
    insights.push({
      type: 'age_risk',
      message: age < 20 
        ? 'You are younger, which may have specific health considerations during pregnancy planning'
        : 'Maternal age may increase certain pregnancy-related risks. Regular prenatal care is important.'
    });
  }

  // Weight-based insights (simplified BMI analysis)
  const bmi = weight / (1.65 * 1.65); // Assuming average height
  if (bmi < 18.5) {
    insights.push({
      type: 'weight_risk',
      message: 'Your BMI suggests you are underweight. Consider consulting with a nutritionist.',
    });
    recommendations.push('Maintain a balanced diet with adequate calories and nutrients');
    recommendations.push('Consider prenatal vitamin supplementation');
  } else if (bmi > 30) {
    insights.push({
      type: 'weight_risk',
      message: 'Your BMI suggests you are overweight. Maintaining a healthy weight is important.',
    });
    recommendations.push('Consult with a healthcare provider about weight management during pregnancy');
    recommendations.push('Engage in regular, moderate physical activity');
  }

  // Medical conditions insights
  const riskConditions = medicalConditions.filter(c => 
    ['diabetes', 'hypertension', 'pcos', 'thyroid', 'anemia'].includes(c.toLowerCase())
  );

  if (riskConditions.length > 0) {
    insights.push({
      type: 'medical_condition',
      message: `You have reported medical conditions (${riskConditions.join(', ')}). Close medical supervision is recommended.`
    });
    recommendations.push('Schedule regular check-ups with your healthcare provider');
    recommendations.push('Monitor your condition regularly as per medical advice');
    recommendations.push('Maintain medication compliance if prescribed');
  }

  // General recommendations
  recommendations.push('Maintain a healthy lifestyle with balanced diet');
  recommendations.push('Get regular physical activity appropriate for your condition');
  recommendations.push('Get adequate sleep (7-9 hours per night)');
  recommendations.push('Manage stress through relaxation techniques');
  recommendations.push('Schedule regular prenatal care appointments');

  return { insights, recommendations };
};

// Calculate risk score
const calculateRiskScore = (age, weight, medicalConditions = []) => {
  let score = 0;

  // Age risk (max 15 points)
  if (age < 20 || age > 35) score += 10;
  if (age < 18 || age > 40) score += 5;

  // Weight risk (max 20 points)
  const bmi = weight / (1.65 * 1.65);
  if (bmi < 18.5 || bmi > 30) score += 15;
  if (bmi < 16 || bmi > 35) score += 5;

  // Medical conditions risk (max 30 points)
  const highRiskConditions = medicalConditions.filter(c => 
    ['diabetes', 'hypertension', 'severe_pcos', 'thyroid_disorder', 'severe_anemia'].includes(c.toLowerCase())
  );
  
  score += highRiskConditions.length * 15;
  score += Math.min(medicalConditions.length * 5, 15);

  return Math.min(score, 100);
};

// Determine risk level
const getRiskLevel = (score) => {
  if (score < 20) return 'low';
  if (score < 40) return 'moderate';
  if (score < 60) return 'medium-high';
  return 'high';
};

// Create health risk assessment
const createAssessment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { age, weight, medicalConditions = [] } = req.body;

    // Validation
    if (!age || !weight) {
      return res.status(400).json({ 
        error: 'age and weight are required' 
      });
    }

    if (age < 15 || age > 60) {
      return res.status(400).json({ 
        error: 'Age must be between 15 and 60' 
      });
    }

    if (weight < 30 || weight > 200) {
      return res.status(400).json({ 
        error: 'Weight must be between 30kg and 200kg' 
      });
    }

    // Generate AI insights
    const { insights, recommendations } = generateAIInsights(age, weight, medicalConditions);
    
    // Calculate risk score and level
    const riskScore = calculateRiskScore(age, weight, medicalConditions);
    const riskLevel = getRiskLevel(riskScore);

    // Create assessment in database
    const assessment = await HealthRisk.create(userId, {
      age,
      weight,
      medicalConditions,
      riskScore,
      riskLevel,
      insights,
      recommendations
    });

    res.status(201).json({
      message: 'Health risk assessment completed successfully',
      assessment: {
        id: assessment.id,
        riskScore: assessment.riskScore,
        riskLevel: assessment.riskLevel,
        insights: assessment.insights,
        recommendations: assessment.recommendations,
        createdAt: assessment.createdAt
      }
    });
  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to create health risk assessment' 
    });
  }
};

// Get latest assessment
const getLatestAssessment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const assessment = await HealthRisk.getLatestByUserId(userId);

    if (!assessment) {
      return res.status(404).json({ 
        error: 'No health risk assessment found. Please create one first.' 
      });
    }

    res.status(200).json({
      assessment: {
        id: assessment.id,
        age: assessment.age,
        weight: assessment.weight,
        medicalConditions: assessment.medicalConditions,
        riskScore: assessment.riskScore,
        riskLevel: assessment.riskLevel,
        insights: assessment.insights,
        recommendations: assessment.recommendations,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt
      }
    });
  } catch (error) {
    console.error('Get latest assessment error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch assessment' 
    });
  }
};

// Get all assessments
const getAllAssessments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const assessments = await HealthRisk.getAllByUserId(userId);

    res.status(200).json({
      assessments: assessments.map(a => ({
        id: a.id,
        age: a.age,
        weight: a.weight,
        riskLevel: a.riskLevel,
        riskScore: a.riskScore,
        createdAt: a.createdAt
      })),
      count: assessments.length
    });
  } catch (error) {
    console.error('Get all assessments error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch assessments' 
    });
  }
};

// Get assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const assessment = await HealthRisk.getById(id, userId);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.status(200).json({ assessment });
  } catch (error) {
    console.error('Get assessment by ID error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch assessment' 
    });
  }
};

// Update assessment
const updateAssessment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { age, weight, medicalConditions } = req.body;

    // If age or weight changed, recalculate insights
    let updates = { ...req.body };
    
    if (age || weight || medicalConditions) {
      const current = await HealthRisk.getById(id, userId);
      if (!current) {
        return res.status(404).json({ error: 'Assessment not found' });
      }

      const newAge = age || current.age;
      const newWeight = weight || current.weight;
      const newConditions = medicalConditions || current.medicalConditions;

      // Regenerate insights
      const { insights, recommendations } = generateAIInsights(newAge, newWeight, newConditions);
      const riskScore = calculateRiskScore(newAge, newWeight, newConditions);
      const riskLevel = getRiskLevel(riskScore);

      updates = {
        ...updates,
        insights,
        recommendations,
        riskScore,
        riskLevel
      };
    }

    const updatedAssessment = await HealthRisk.update(id, userId, updates);

    res.status(200).json({
      message: 'Assessment updated successfully',
      assessment: updatedAssessment
    });
  } catch (error) {
    console.error('Update assessment error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to update assessment' 
    });
  }
};

// Delete assessment
const deleteAssessment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deleted = await HealthRisk.delete(id, userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Delete assessment error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to delete assessment' 
    });
  }
};

module.exports = {
  createAssessment,
  getLatestAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  generateAIInsights,
  calculateRiskScore,
  getRiskLevel
};
