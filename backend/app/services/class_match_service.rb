class ClassMatchService
  def initialize(user)
    @user = user
  end

  def matches
    # classes current user takes
    current_classes = @user.class_enrollments.pluck(:subject, :catalog_number)

    # find enrollments in those classes excluding current user
    enrollments = ClassEnrollment
      .where(subject: current_classes.map(&:first),
             catalog_number: current_classes.map(&:last))
      .where.not(user_id: @user.id)

    # group enrollments by user
    grouped = enrollments.group_by(&:user_id)

    users = User.where(id: grouped.keys).index_by(&:id)

    results = grouped.map do |user_id, shared_enrollments|
      shared_count = shared_enrollments.count

      # percentage relative to current user's classes
      percent_match = (shared_count.to_f / current_classes.length * 100).round

      {
        user: users[user_id],
        shared_classes: shared_count,
        percent_match: percent_match
      }
    end

    # sort by most shared classes
    results.sort_by { |r| -r[:shared_classes] }
  end
end