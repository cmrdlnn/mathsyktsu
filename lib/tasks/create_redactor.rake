# frozen_string_literal: true

desc 'Creates an administrator account'
task :create_redactor, %i[password email full_name] => [:environment] do |t, args|
  logger = Logger.new(STDOUT)

  ERRORS_MESSAGES = {
    'Validation failed: Password is too short (minimum is 6 characters)' =>
      'Пароль слишком короткий (минимум 6 символов).',

    'Validation failed: Email is invalid' =>
      'E-Mail должен быть строкой `redactor` или быть в формате электронной ' \
      'почты (mailbox@hostname)'
  }.freeze

  redactor = User.find_by(role: 'redactor')

  attributes = { password: args.password || SecureRandom.hex(4) }
  attributes[:email] = args.email if args.email
  attributes[:full_name] = args.full_name if args.full_name

  begin
    if redactor
      redactor.update!(attributes)
    else
      %i[email full_name role].each do |attribute|
        attributes[attribute] = 'redactor' unless attributes[attribute]
      end

      redactor = User.create!(attributes)
    end

    logger.info { 'Учетная запись редактора успешно создана' }
    logger.info { "Название учётной записи редактора (email): `#{redactor.email}`" }
    logger.info { "Пароль учётной записи редактора: `#{attributes[:password]}`" }
  rescue => e
    p e.message
    logger.info { ERRORS_MESSAGES[e.message] }
  end
end
