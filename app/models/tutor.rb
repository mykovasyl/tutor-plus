class Tutor < User
  has_many :tutor_students
  has_many :students, through: :tutor_students

  validates :name, presence: true 
  validates :hourly_rate, presence: true
  validates :subjects, presence: true
end